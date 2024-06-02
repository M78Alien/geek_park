import { http } from "@/utils/modules/request";

export function getChannelAPI () {
  return http({
    url: '/channels',
    method: 'GET'
  })
}

export function createArticleAPI (data) {
  return http({
    url: '/mp/articles',
    method: 'POST',
    data
  })
}