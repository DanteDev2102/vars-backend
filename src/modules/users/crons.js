import usersModel from '../../libs/database/collections/users.js';
import { logger } from '../../libs/logging/logger.js';

let isExecuteCron = false;

export default [
  {
    time: '0 */30 * * * *',
    cron: async () => {
      try {
        if (isExecuteCron) return;

        isExecuteCron = true;

        const patients = await usersModel.find({
          role: 'professional',
          isActive: true,
          professional: { $exists: false }
        });

        if (!patients.length) {
          logger.info('not found patients in db');
          isExecuteCron = false;
          return;
        }

        const professionals = await usersModel.aggregate([
          {
            $match: {
              role: 'professional',
              isActive: true
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'professional',
              as: 'patients'
            }
          },
          {
            $group: {
              _id: '$_id',
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: -1 }
          }
        ]);

        if (!professionals.length) {
          logger.info('not found professionals in db');
          isExecuteCron = false;
          return;
        }

        professionals.forEach(async (professional) => {
          if (!patients.length) return;

          const profesional = await usersModel.findById(professional.id);
          const patientsAssign = professional.patients;

          const { id } = patients.shift();
          const patient = await usersModel.findById(id);

          patient.professional = profesional.id;
          profesional.patients = [...patientsAssign, patient.id];

          await patient.save();
          await profesional.save();
        });
      } catch (error) {
        logger.error(error);
      } finally {
        isExecuteCron = false;
      }
    },
    name: 'assign professional'
  }
];
