export interface IServerError {
  code: number,
  message: string
}

export interface IServerResponseDto<T> {
  data: T,
  error: IServerError | null
}
