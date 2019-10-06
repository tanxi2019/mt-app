import Router from 'koa-router'
import Poi from '../dbs/models/poi'
import axios from './utils/axios'

const sign = 'abcd'
const router = new Router({ prefix: '/search' })

router.get('/top', async (ctx) => {
  const { status, data: { top } } = await axios.get(`http://cp-tools.cn/search/top?sign=${sign}`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200 ? top : []
  }
})

router.get('/hotPlace', async (ctx) => {
  const city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  const { status, data: { result } } = await axios.get(`http://cp-tools.cn/search/hotPlace?sign=${sign}`, {
    params: {
      sign,
      city
    } })
  ctx.body = {
    result: status === 200 ? result : []
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const { city, keyword } = ctx.query
  // eslint-disable-next-line no-template-curly-in-string
  const { status, data: { count, pois } } = await axios.get('http://cp-tools.cn/search/resultsByKeywords?sign=${sign}', {
    params: {
      city,
      keyword,
      sign
    }
  })
  ctx.body = {
    count: status === 200 ? count : 0,
    pois: status === 200 ? pois : []
  }
})

router.get('/products', async (ctx) => {
  const keyword = ctx.query.keyword || '旅游'
  const city = ctx.query.city || '北京'
  const {
    status,
    data: {
      product,
      more
    }
    // eslint-disable-next-line no-template-curly-in-string
  } = await axios.get('http://cp-tools.cn/search/products?sign=${sign}', {
    params: {
      keyword,
      city,
      sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  } else {
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more : [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router
