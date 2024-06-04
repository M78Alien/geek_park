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

export function getArticleListAPI (params) {
  return http({
    url: '/mp/articles',
    method: 'GET',
    params
  })
}

export function deleteArticleAPI (target) {
  return http({
    url: `/mp/articles/${target}`,
    method: 'DELETE'
  })
}

export function getArticleDetailAPI (id) {
  return http({
    url: `/mp/articles/${id}`,
    method: 'GET'
  })
}

export function editArticleAPI (target, data) {
  return http({
    url: `/mp/articles/${target}`,
    method: 'PUT',
    data
  })
}