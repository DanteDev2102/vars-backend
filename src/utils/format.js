function getPatient(user) {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    notes: user.notes,
    goals: user.goals,
    context: user.context,
    profileUrl: user.profileUrl,
    isTreatment: user.isTreatment,
    treatment: user.treatment,
    birthdate: user.birthdate
  };
}

function getProfessional(user) {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    profileUrl: user.profileUrl,
    nroDoctor: user.nroDoctor,
    phone: user.phone
  };
}

function getAdmin(user) {
  return {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    profileUrl: user.profileUrl
  };
}

export function getDataUser(user) {
  switch (user.role) {
    case 'patient':
      return getPatient(user);
    case 'professional':
      return getProfessional(user);
    default:
      return getAdmin(user);
  }
}
