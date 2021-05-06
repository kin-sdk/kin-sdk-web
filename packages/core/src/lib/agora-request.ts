import axios, { AxiosResponse } from 'axios'

export function agoraRequest(url: string, data: Uint8Array): Promise<AxiosResponse> {
  return axios.request({
    method: 'post',
    url: url,
    data: data,
    headers: {
      'Content-Type': 'application/proto',
    },
    responseType: 'arraybuffer',
  })
}
