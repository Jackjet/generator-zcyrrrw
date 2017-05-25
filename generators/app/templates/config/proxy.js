/**
 * 接口代理转发
 * 针对多个域名，分别进行接口转发
 */

const domainTable = {
  dev: 'dev.cai-inc.com',
  test: 'test.cai-inc.com',
  staging: 'staging.zcy.gov.cn',
}

const domain = domainTable['staging']

module.exports = {
  rules: {
    // 用户
    uaa: {
      host: `http://login.${domain}`,
      urls: [

      ],
    },
    // 网超
    mall: {
      host: `http://${domain}`,
      urls: [],
    },
    // middle
    middle: {
      host: `http://middle.${domain}`,
      urls: [
        '/api/zoss/*',
        '/api/district/getDistrictTree',
        '/api/address/:pid/children',
      ],
    },
    // 专家库
    experts: {
      host: `http://experts.${domain}`,
      urls: [
        '/zcy/experts/*',
      ],
    },
    // 代理机构
    agency: {
      host: `http://agency.${domain}`,
      urls: [

      ],
    },
    // 供应商
    supplier: {
      host: `http://supplier.${domain}`,
      urls: [],
    },
    // 定点服务
    fixed: {
      host: `http://fixed.${domain}`,
      urls: [],
    },
    // 定点服务
    fixed: {
      host: `http://fixed.${domain}`,
      urls: [],
    },
    // 招投标
    bidding: {
      host: `http://bidding.${domain}`,
      urls: [],
    },
    // 车辆控购
    vehicle: {
      host: `http://vehicle.${domain}`,
      urls: [],
    },
    // 反向竞价
    reverse: {
      host: `http://reverse.${domain}`,
      urls: [],
    },
    // 在线询价，协议供货
    inquiry: {
      host: `http://inquiry.${domain}`,
      urls: [],
    },
    // 合同
    contract: {
      host: `http://contract.${domain}`,
      urls: [],
    }
  },
  user: {
    account: '339900123456',
    password: 'test123456'
  }
}
