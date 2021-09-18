export type HttpResponse = {
  statusCode: number
  data: any
}

export const badRequest = (_error: Error): HttpResponse => ({
  statusCode: 400,
  data: new Error('The field token is required')
})
