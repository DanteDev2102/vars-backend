export function responseSuccess(data, msg) {
  return { data: { ...data }, msg, errors: null };
}

export function responseError(errors, msg) {
  return { data: null, msg, errors: { ...errors } };
}
