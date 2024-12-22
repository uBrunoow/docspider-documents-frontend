import { IHttpRequestParams } from './api'

const getHeaders = (props: IHttpRequestParams) => {
  const headers = {
    'Content-type': 'application/json',
    ...props.extraHeaders,
  }

  return headers
}
export default getHeaders
