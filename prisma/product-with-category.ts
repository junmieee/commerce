import { PrismaClient, Prisma } from '@prisma/client'
import { m } from 'framer-motion'
import { Patrick_Hand_SC } from 'next/font/google'

const getRandom = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const prisma = new PrismaClient()

const sneakers = [
  {
    name: `Sneakers 1`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d38e80c8-a177-4927-9c05-0c4099bf1a53/tc-7900-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-2rIhOi40.png',
      // 'https://plus.unsplash.com/premium_photo-1690349404224-53f94f20df8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      // 'https://images.pexels.com/photos/1304647/pexels-photo-1304647.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://static.zara.net/photos///2023/I/1/1/p/5012/210/202/2/w/293/5012210202_6_8_1.jpg?ts=1690471708255',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 2`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_jordan_womens-aj-1-retro-high-og_DJ4891-061.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/af53d53d-561f-450a-a483-70a7ceee380f/%EB%8D%A9%ED%81%AC-%EB%A1%9C%EC%9A%B0-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-ZuZyA5Sj.png',
      // 'https://plus.unsplash.com/premium_photo-1682096340835-022e6647b698?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      // 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://static.zara.net/photos///2023/I/1/1/p/5012/210/001/2/w/293/5012210001_15_1_1.jpg?ts=1690452076981',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 3`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_jordan_aj-1-mid-se-craft_DM9652-100.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f094af40-f82f-4fb9-a246-e031bf6fc411/%EC%97%90%EC%96%B4-%ED%8F%AC%EC%8A%A4-1-07-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-nCaVAw47.png',
      // 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      'https://static.zara.net/photos///2023/I/1/1/p/5015/210/202/2/w/293/5015210202_15_2_1.jpg?ts=1690544566533',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 4`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_new_balance-990v3-_made-by-teddy-santis__M990TG3.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d38e80c8-a177-4927-9c05-0c4099bf1a53/tc-7900-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-2rIhOi40.png',
      'https://static.zara.net/photos///2023/I/1/1/p/5040/210/001/2/w/293/5040210001_15_3_1.jpg?ts=1692959193549',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 5`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_converse_chuck-70-hi_A00754C.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/5694777b-506d-4725-a0d7-9a76c4d6a373/%EC%97%90%EC%96%B4-%ED%8F%AC%EC%8A%A4-1-07-lx-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-4DJRzfc5.png',
      'https://static.zara.net/photos///2023/V/1/1/p/5100/110/001/2/w/563/5100110001_6_1_1.jpg?ts=1674822111052',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 6`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-force-1-low-retro_DJ3911-100.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/39639d9b-d33c-4302-861c-44f7f084d9a2/%EC%97%90%EC%96%B4-%EB%A6%AC%ED%94%84%ED%8A%B8-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-MOHCVRR1.png',
      'https://static.zara.net/photos///2023/I/1/1/p/5800/210/202/2/w/293/5800210202_15_1_1.jpg?ts=1686656308906',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 7`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-more-uptempo-96_DH8011-100.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7d94c2f2-edb7-49b5-a10b-00882efe66b4/%EC%8A%A4%ED%8C%8C%ED%81%AC-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-aFqxAapA.png',
      'https://static.zara.net/photos///2023/I/1/1/p/5410/210/800/2/w/201/5410210800_15_2_1.jpg?ts=1686742702247',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 8`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-force-1-high-07-lv8-vintage_DM0209-100.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a7e3ec3-f556-460f-aa3e-24ec799ea8eb/%EC%97%90%EC%96%B4-%ED%8F%AC%EC%8A%A4-1-%EC%89%90%EB%8F%84%EC%9A%B0-%EC%97%AC%EC%84%B1-%EC%8B%A0%EB%B0%9C-M0Ujl1he.png',
      'https://static.zara.net/photos///2023/I/1/1/p/5028/110/032/2/w/201/5028110032_15_2_1.jpg?ts=1683615705307',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 9`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_air-max-95_DV3197-001.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/f9836802-1f49-4efa-9066-20a9575e0afe/%EC%BD%94%ED%8A%B8-%EB%A0%88%EA%B1%B0%EC%8B%9C-%EC%97%AC%EC%84%B1-%EB%AE%AC-pjzT7yQp.png',
      'https://static.zara.net/photos///2023/V/1/1/p/5412/110/808/2/w/201/5412110808_15_10_1.jpg?ts=1675847041840',
    price: getRandom(300000, 100000),
  },
  {
    name: `Sneakers 10`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 1,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/footwear_nike_acg-mountain-fly-low-se_DQ1979-001.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/33bd87c3-7f79-40ce-9e40-b9f37d3a4acc/%EC%A1%B0%EB%8D%98-%EC%86%8C%ED%94%BC%EC%95%84-%EC%97%AC%EC%84%B1-%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C-y5T8cYUD.png',
      'https://static.zara.net/photos///2023/I/1/1/p/5001/210/032/2/w/293/5001210032_15_2_1.jpg?ts=1686237197197',
    price: getRandom(300000, 100000),
  },
]

const tShirt = [
  {
    name: `T-Shirt 1`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_lockup-ss-tee_80299.color_black.view_1_720x.jpg',
      // 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/63c17267-ecb3-4d20-a3f9-6208fe1da6bc/%EC%A1%B0%EB%8D%98-%ED%94%8C%EB%9D%BC%EC%9D%B4%ED%8A%B8-%EC%97%AC%EC%84%B1-%EB%8B%88%ED%8A%B8-%ED%83%91-96tTBDw0.png',
      'https://static.zara.net/photos///2023/I/0/1/p/3253/328/505/17/w/293/3253328505_1_1_1.jpg?ts=1692889990930',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 2`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_magic-ss-tee_80309.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3253/328/800/17/w/293/3253328800_2_1_1.jpg?ts=1692889991532',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 3`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_undefeated_juice-basketball-jersey_10091.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/2335/959/049/2/w/293/2335959049_2_1_1.jpg?ts=1692706501466',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 4`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_top-dog-ss-tee_80323.color_navy.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/4174/813/250/2/w/293/4174813250_1_1_1.jpg?ts=1692284605026',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 5`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_est.-ss-tee_80332.color_teal.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/8417/801/629/2/w/293/8417801629_1_1_1.jpg?ts=1692279530323',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 6`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_undefeated_signals-ss-tee_80328.color_navy.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/2335/008/703/2/w/293/2335008703_2_1_1.jpg?ts=1690905094962',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 7`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_nike_nrg-ispa-gpx-tee_DV0687-817.color_rushorange.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/0085/842/812/2/w/293/0085842812_2_1_1.jpg?ts=1692796709769',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 8`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tees_bape_1st-camo-bape-logo-tee_1I30-110-070.color_white.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/5644/828/044/2/w/293/5644828044_1_1_1.jpg?ts=1692796709900',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 9`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_patta_yo-whats-up-t-shirt_AW22-WHATS-UP-TS-001.color_phantom.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/5644/827/063/2/w/293/5644827063_2_1_1.jpg?ts=1692796711011',
    price: getRandom(300000, 100000),
  },
  {
    name: `T-Shirt 10`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 2,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_patta_smile-for-me-t-shirt_AW22-SMILE-TS-001.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/4174/825/026/2/w/293/4174825026_1_1_1.jpg?ts=1692864058536',
    price: getRandom(300000, 100000),
  },
]

const pants = [
  {
    name: `Pants 1`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_running-short_UA60012.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/5520/240/407/2/w/293/5520240407_2_5_1.jpg?ts=1692196691479',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 2`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_wave-short_50061.color_teal.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/8258/357/800/2/w/293/8258357800_2_1_1.jpg?ts=1692689343673',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 3`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_outliNE-logo-sport-short_50060.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/9929/229/704/2/w/293/9929229704_1_1_1.jpg?ts=1692779344815',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 4`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_outliNE-logo-sport-short_50060.color_tangerine.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/8380/114/803/2/w/293/8380114803_1_1_1.jpg?ts=1692778670084',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 5`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_hoop-short_60064.color_grey.view_1_720x.jpg',
      // 'https://static.zara.net/photos///2023/I/0/1/p/7102/509/922/2/w/293/7102509922_2_1_1.jpg?ts=1692874445028',
      'https://static.zara.net/photos///2023/I/0/1/p/8400/350/808/2/w/293/8400350808_1_1_1.jpg?ts=1692874442684',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 6`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_hoop-short_60064.color_lavender.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3199/803/819/2/w/293/3199803819_6_1_1.jpg?ts=1692962851674',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 7`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_hoop-short_60064.color_teal.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3199/803/800/2/w/293/3199803800_6_1_1.jpg?ts=1692870057727',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 8`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_classic-swim-trunk_50059.color_pink.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/7149/046/401/2/w/293/7149046401_2_1_1.jpg?ts=1692877446788',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 9`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_undefeated_vintage-twill-short_50034.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/2753/121/704/2/w/293/2753121704_1_1_1.jpg?ts=1692879488115',
    price: getRandom(300000, 100000),
  },
  {
    name: `Pants 10`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 3,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottoms_running-short_UA60012.color_navy.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/7102/562/800/19/w/293/7102562800_1_1_1.jpg?ts=1692195760000',
    price: getRandom(300000, 100000),
  },
]

const cap = [
  {
    name: `Cap 1`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_twill-boonie_90222.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/0653/231/400/2/w/159/0653231400_6_1_1.jpg?ts=1689259406299',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 2`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_ne_two-toNE-lp-snapback_90220.color_blackteal.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3920/215/330/2/w/159/3920215330_6_1_1.jpg?ts=1687776281319',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 3`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_nylon-icon-strapback_90212.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3920/235/800/2/w/159/3920235800_6_1_1.jpg?ts=1689863014350',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 4`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_stencil-icon-label-beanie_90204.color_black.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3920/222/711/2/w/159/3920222711_2_1_1.jpg?ts=1688032289537',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 5`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_ne_icon-fitted_90200.color_navy.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3739/214/705/2/w/159/3739214705_6_1_1.jpg?ts=1688644850947',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 6`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_icon-bucket-hat_90221.color_black.view_1_720x.jpg',
      // 'https://static.zara.net/photos///2023/V/0/1/p/1023/001/712/2/w/159/1023001712_6_1_1.jpg?ts=1675271470800',
      'https://static.zara.net/photos///2023/I/0/1/p/0653/228/505/2/w/159/0653228505_6_1_1.jpg?ts=1683632744575',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 7`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_icon-bucket-hat_90221.color_dark-grey.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3920/238/400/2/w/159/3920238400_6_1_1.jpg?ts=1689065599945',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 8`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_icon-bucket-hat_90221.color_tangerine.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/3920/222/500/2/w/159/3920222500_6_1_1.jpg?ts=1688544359663',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 9`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_headwear_undefeated_wave-strapback_90218.color_teal.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/0653/232/052/2/w/159/0653232052_6_1_1.jpg?ts=1688109611625',
    price: getRandom(300000, 100000),
  },
  {
    name: `Cap 10`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 4,
    image_url:
      // 'https://cdn.shopify.com/s/files/1/0282/5850/products/accessories_vans_anderson_paak-malibu-bucket-hat_VN0A54A2211.color_multi.view_1_720x.jpg',
      'https://static.zara.net/photos///2023/I/0/1/p/0653/231/600/2/w/159/0653231600_6_1_1.jpg?ts=1689259405145',
    price: getRandom(300000, 100000),
  },
]

const hoodie = [
  {
    name: `Hoodie 1`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_undefeated_stencil-logo-pullover-hood_20078.color_black.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 2`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_undefeated_stencil-icon-pullover-hood_20077.color_olive.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 3`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_undefeated_uactp-icon-pullover-hoodie_UA20008.color_black.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 4`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_undefeated_uactp-icon-pullover-hoodie_UA20008.color_heathergrey.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 5`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_undefeated_la_kings-chrome-hoodie_70025.color_black.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 6`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_bape_color-camo-shark-wide-fit-full-zip-double_1H80-115-010.color_red.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 7`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_jordan_mcr-flc-hoodie_DJ9772-839.color_coppermoon.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 8`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_tops_newbalance_made-in-usa-core-hoodie_MT21540.color_athletic-grey.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 9`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bottom_patta_teddy-bear-boxy-hooded-sweater_TEDDY-BEAR-BHS-001.color_black.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
  {
    name: `Hoodie 10`,
    contents: `{"blocks":[{"key":"5fi56","text":"본 제품은 오가닉 소재입니다. 어느 스타일에도 잘 어울리는 힙한 감성을 품고 있습니다.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}`,
    category_id: 5,
    image_url:
      'https://cdn.shopify.com/s/files/1/0282/5850/products/apparel_bape_color-camo-tiger-shark-wide-full-zip-double_1I30-115-021.view_1_720x.jpg',
    price: getRandom(300000, 100000),
  },
]

const productData: Prisma.productsCreateInput[] = [
  ...sneakers,
  ...hoodie,
  ...pants,
  ...cap,
  ...tShirt,
]

async function main() {
  const CATEGORIES = ['SNEAKERS', 'T-Shirt', 'PANTS', 'CAP', 'HOODIE']
  CATEGORIES.forEach(async (c, i) => {
    const product = await prisma.categories.upsert({
      where: {
        id: i + 1,
      },
      update: {
        name: c,
      },
      create: {
        name: c,
      },
    })
    console.log(`Upsert category id: ${product.id}`)
  })
  await prisma.products.deleteMany({})

  for (const p of productData) {
    const product = await prisma.products.create({
      data: p,
    })
    console.log(`Created id: ${product.id} `)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
