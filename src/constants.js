// ═══ CONFIGURATION — UPDATE THESE WITH REAL DATA ═══

export const SHOW_SOCIAL_PROOF = false; // Set true only after verifying real engagement data
export const WHATSAPP_NUMBER = "85620951687899"; // Confirmed: +856 20 95 168 789 9
export const EMAIL_ADDRESS = "contact@lk-laos.com"; // PLACEHOLDER — create before launch
export const SCHEDULE_URL = "https://cal.com"; // PLACEHOLDER — set up Cal.com booking page
export const HERO_IMAGE_URL = null; // Replace with real drone/landscape photo URL
export const PORTRAIT_URL = null; // Replace with real portrait photo URL
export const CONTACT_PORTRAIT_URL = null; // Replace with casual photo URL

// Portfolio data — REPLACE ALL with verified real numbers
export const PORTFOLIO = [
  { name: "Vientiane Capital", nameKO: "비엔티안", nameZH: "万象", nameLO: "ນະຄອນຫຼວງວຽງຈັນ", hectares: "TBD", parcels: "TBD", mapX: 52, mapY: 58 },
  { name: "Vang Vieng", nameKO: "방비엥", nameZH: "万荣", nameLO: "ວັງວຽງ", hectares: "TBD", parcels: "TBD", mapX: 48, mapY: 47 },
  { name: "Feuang", nameKO: "프앙", nameZH: "丰宏", nameLO: "ເຟືອງ", hectares: "TBD", parcels: "TBD", mapX: 45, mapY: 50 },
  { name: "Luang Prabang", nameKO: "루앙프라방", nameZH: "琅勃拉邦", nameLO: "ຫຼວງພະບາງ", hectares: "TBD", parcels: "TBD", mapX: 45, mapY: 35 },
];

// Milestones — REPLACE ALL with verified real milestones from client
// IMPORTANT: Do not launch with placeholder milestones.
export const MILESTONES = [
  { year: "YYYY", text: "Founded Lao-Korea Cooperation in Vientiane", textKO: "비엔티안에서 라오-한국 협력 설립", textZH: "在万象成立老挝-韩国合作公司", textLO: "ສ້າງຕັ້ງ ລາວ-ເກົາຫຼີ ຮ່ວມມື ໃນວຽງຈັນ" },
  { year: "YYYY", text: "Established government and business network across key provinces", textKO: "주요 지방에 걸쳐 정부 및 비즈니스 네트워크 구축", textZH: "在主要省份建立政府和商业网络", textLO: "ສ້າງເຄືອຂ່າຍລັດຖະບານ ແລະ ທຸລະກິດ" },
  { year: "YYYY", text: "Began strategic land acquisition in Vientiane and Luang Prabang", textKO: "비엔티안과 루앙프라방에서 전략적 토지 확보 시작", textZH: "开始在万象和琅勃拉邦进行战略性土地收购", textLO: "ເລີ່ມການໄດ້ມາທີ່ດິນ" },
  { year: "YYYY", text: "Expanded operations to Vang Vieng and Feuang regions", textKO: "방비엥 및 프앙 지역으로 사업 확장", textZH: "将业务扩展到万荣和丰宏地区", textLO: "ຂະຫຍາຍການດຳເນີນງານ" },
  { year: "YYYY", text: "Initiated partnerships with international development groups", textKO: "국제 개발 그룹과의 파트너십 시작", textZH: "与国际开发集团建立合作关系", textLO: "ເລີ່ມຕົ້ນການຮ່ວມມືກັບກຸ່ມພັດທະນາ" },
];

// Documents — only include types she actually possesses
// IMPORTANT: Remove any she does not have. Never represent documents that do not exist.
export const DOCUMENTS = [
  { type: "Land title certificate", typeLO: "ໃບຕາດິນ", region: "Vientiane" },
  { type: "Survey report", typeLO: "ບົດລາຍງານສຳຫຼວດ", region: "Vang Vieng" },
  { type: "Development assessment", typeLO: "ການປະເມີນການພັດທະນາ", region: "Feuang" },
  { type: "Regional land registry", typeLO: "ທະບຽນທີ່ດິນ", region: "Luang Prabang" },
];

// Opportunities
export const OPPORTUNITIES = [
  {
    id: "vientiane",
    category: { en: "Industrial / Data centers", ko: "산업 / 데이터 센터", zh: "工业 / 数据中心", lo: "ອຸດສາຫະກຳ" },
    size: { en: "TBD hectares across TBD parcels", ko: "TBD 헥타르, TBD 필지", zh: "TBD 公顷，TBD 地块", lo: "TBD ເຮັກຕາ" },
    summary: {
      en: "Strategic parcels in and around the capital, positioned for data center infrastructure, industrial development, and mixed-use residential projects.",
      ko: "수도 및 인근 지역의 전략적 토지, 데이터 센터 인프라, 산업 개발 및 복합 주거 프로젝트에 적합합니다.",
      zh: "位于首都及周边的战略地块，适合数据中心基础设施、工业开发和混合用途住宅项目。",
      lo: "ດິນຍຸດທະສາດໃນ ແລະ ອ້ອมຮອບນະຄອນຫຼວງ",
    },
    description: {
      en: "Vientiane is the administrative and economic center of Laos, experiencing sustained growth driven by the China-Laos railway terminus and expanding Special Economic Zones. Land near the capital offers proximity to government institutions, international business, and transportation infrastructure.",
      ko: "비엔티안은 라오스의 행정 및 경제 중심지로, 중국-라오스 철도 종점과 경제특구 확장에 의해 지속적인 성장을 경험하고 있습니다.",
      zh: "万象是老挝的行政和经济中心，受中老铁路终点站和经济特区扩展的推动，经历着持续增长。",
      lo: "ວຽງຈັນເປັນສູນກາງ",
    },
    concepts: [
      { icon: "server", title: { en: "Data center campus", ko: "데이터 센터 캠퍼스", zh: "数据中心园区", lo: "ສູນຂໍ້ມູນ" }, text: { en: "Growing regional demand for cloud infrastructure and data sovereignty requirements create opportunity near established power grid and fiber optic corridors.", ko: "클라우드 인프라 및 데이터 주권 요구 사항에 대한 지역 수요 증가.", zh: "区域云基础设施需求增长。", lo: "ຄວາມຕ້ອງການ" } },
      { icon: "building", title: { en: "Mixed-use residential", ko: "복합 주거", zh: "混合用途住宅", lo: "ທີ່ຢູ່ອາໄສ" }, text: { en: "Expanding diplomatic and business community drives demand for premium housing. Limited quality supply in the capital creates favorable pricing dynamics.", ko: "외교 및 비즈니스 커뮤니티 확대로 프리미엄 주택 수요 증가.", zh: "外交和商业社区扩大推动高端住房需求。", lo: "ຊຸມຊົນທາງການທູດ" } },
      { icon: "factory", title: { en: "Industrial park", ko: "산업 단지", zh: "工业园区", lo: "ສວນອຸດສາຫະກຳ" }, text: { en: "Railway terminus proximity and SEZ incentives support manufacturing and logistics operations serving the Thailand-China trade corridor.", ko: "철도 종점 인접성과 경제특구 인센티브가 제조 및 물류 운영을 지원.", zh: "铁路终点站的邻近性和经济特区激励措施支持制造和物流运营。", lo: "ໃກ້ສະຖານີລົດໄຟ" } },
    ],
    advantages: { en: ["Railway terminus", "SEZ access", "Government proximity", "Power grid"], ko: ["철도 종점", "경제특구", "정부 인접", "전력 인프라"], zh: ["铁路终点站", "经济特区", "政府邻近", "电力网络"], lo: ["ສະຖານີລົດໄຟ", "ເຂດເສດຖະກິດ"] },
  },
  {
    id: "vangvieng",
    category: { en: "Tourism / Hospitality", ko: "관광 / 호스피탈리티", zh: "旅游 / 酒店", lo: "ການທ່ອງທ່ຽວ" },
    size: { en: "TBD hectares across TBD parcels", ko: "TBD 헥타르, TBD 필지", zh: "TBD 公顷，TBD 地块", lo: "TBD ເຮັກຕາ" },
    summary: {
      en: "Laos's fastest-growing tourism destination. Premium parcels along the Nam Song River corridor for hospitality and eco-development.",
      ko: "라오스에서 가장 빠르게 성장하는 관광지. 남송강 회랑을 따라 호스피탈리티 및 에코 개발을 위한 프리미엄 토지.",
      zh: "老挝增长最快的旅游目的地。南松河走廊沿线的优质地块。",
      lo: "ຈຸດໝາຍການທ່ອງທ່ຽວ",
    },
    description: {
      en: "Vang Vieng has transformed from a backpacker stop into a premium tourism destination with new international-standard infrastructure including the China-Laos railway station. Government investment in roads, an airport expansion study, and the designation of tourism development zones signal long-term commitment.",
      ko: "방비엥은 배낭여행자 경유지에서 프리미엄 관광지로 변모했습니다. 중국-라오스 철도역을 포함한 새로운 국제 표준 인프라가 구축되었습니다.",
      zh: "万荣已从背包客中转站转变为拥有新国际标准基础设施的高端旅游目的地。",
      lo: "ວັງວຽງ",
    },
    concepts: [
      { icon: "hotel", title: { en: "Boutique eco-resort", ko: "부티크 에코 리조트", zh: "精品生态度假村", lo: "ລີສອດ" }, text: { en: "River valley setting with mountain backdrop. Growing direct rail access from both Vientiane and China expands the high-value visitor market.", ko: "산을 배경으로 한 강 계곡. 비엔티안과 중국에서의 직통 철도 접근.", zh: "以山为背景的河谷环境。", lo: "ພູມທັດ" } },
      { icon: "mountain", title: { en: "Adventure tourism complex", ko: "모험 관광 단지", zh: "探险旅游综合体", lo: "ການທ່ອງທ່ຽວ" }, text: { en: "Established reputation for outdoor activities combined with improving infrastructure supports premium experience-based hospitality.", ko: "야외 활동으로 확립된 명성과 개선되는 인프라.", zh: "成熟的户外活动声誉结合改善的基础设施。", lo: "ກິດຈະກຳ" } },
    ],
    advantages: { en: ["Railway station", "River frontage", "Tourism zone", "Mountain views"], ko: ["철도역", "강변", "관광구역", "산 전경"], zh: ["铁路站", "河岸", "旅游区", "山景"], lo: ["ສະຖານີ", "ແຄມນ້ຳ"] },
  },
  {
    id: "feuang",
    category: { en: "Energy / Industrial", ko: "에너지 / 산업", zh: "能源 / 工业", lo: "ພະລັງງານ" },
    size: { en: "TBD hectares across TBD parcels", ko: "TBD 헥타르, TBD 필지", zh: "TBD 公顷，TBD 地块", lo: "TBD ເຮັກຕາ" },
    summary: {
      en: "Emerging development zone in Vientiane Province with available land for energy projects and industrial estates.",
      ko: "비엔티안 주의 신흥 개발 지역. 에너지 프로젝트 및 산업 단지를 위한 토지.",
      zh: "万象省新兴开发区，有可用于能源项目和工业园区的土地。",
      lo: "ເຂດພັດທະນາ",
    },
    description: {
      en: "Feuang district offers large-scale land availability at significantly lower cost than Vientiane proper, while remaining within the capital's economic orbit. Road infrastructure improvements and power grid expansion make this area increasingly viable for projects that require scale.",
      ko: "프앙 지구는 비엔티안보다 현저히 낮은 비용으로 대규모 토지를 제공합니다.",
      zh: "丰宏地区以远低于万象的成本提供大规模土地。",
      lo: "ເຂດເຟືອງ",
    },
    concepts: [
      { icon: "solar", title: { en: "Solar energy farm", ko: "태양광 발전소", zh: "太阳能农场", lo: "ພະລັງງານແສງອາທິດ" }, text: { en: "Favorable terrain and solar exposure combined with Laos's commitment to renewable energy exports create opportunity for grid-connected generation.", ko: "유리한 지형과 일조량, 재생 에너지 수출에 대한 라오스의 약속.", zh: "有利的地形和日照条件。", lo: "ພື້ນທີ່ເໝາະສົມ" } },
      { icon: "factory", title: { en: "Industrial estate", ko: "산업 단지", zh: "工业园区", lo: "ສວນອຸດສາຫະກຳ" }, text: { en: "Land scale and cost advantage support development of manufacturing zones serving companies implementing supply chain diversification strategies.", ko: "토지 규모와 비용 이점이 공급망 다변화 전략.", zh: "土地规模和成本优势支持制造区开发。", lo: "ຂໍ້ໄດ້ປຽບ" } },
    ],
    advantages: { en: ["Large parcels", "Low cost", "Grid access", "Road connection"], ko: ["대규모 토지", "저비용", "전력망", "도로 연결"], zh: ["大面积", "低成本", "电网", "道路连接"], lo: ["ດິນກວ້າງ", "ລາຄາຕ່ຳ"] },
  },
  {
    id: "luangprabang",
    category: { en: "Tourism / Residential", ko: "관광 / 주거", zh: "旅游 / 住宅", lo: "ການທ່ອງທ່ຽວ / ທີ່ຢູ່" },
    size: { en: "TBD hectares across TBD parcels", ko: "TBD 헥타르, TBD 필지", zh: "TBD 公顷，TBD 地块", lo: "TBD ເຮັກຕາ" },
    summary: {
      en: "UNESCO World Heritage city with growing international air connectivity. Premium land for boutique hospitality and cultural development.",
      ko: "유네스코 세계문화유산 도시. 부티크 호스피탈리티 및 문화 개발을 위한 프리미엄 토지.",
      zh: "联合国教科文组织世界遗产城市。精品酒店和文化开发的优质土地。",
      lo: "ມໍລະດົກໂລກ",
    },
    description: {
      en: "Luang Prabang's UNESCO designation provides a permanent international brand. Direct flights from Seoul, Bangkok, Kunming, and Hanoi create a diverse high-value visitor base. Strict heritage preservation rules limit new development supply, increasing the value of parcels outside the protected core.",
      ko: "루앙프라방의 유네스코 지정은 영구적인 국제 브랜드를 제공합니다. 서울, 방콕, 쿤밍, 하노이에서의 직항편.",
      zh: "琅勃拉邦的联合国教科文组织认定提供了永久的国际品牌。",
      lo: "ຫຼວງພະບາງ",
    },
    concepts: [
      { icon: "hotel", title: { en: "Heritage boutique hotel", ko: "헤리티지 부티크 호텔", zh: "遗产精品酒店", lo: "ໂຮງແຮມ" }, text: { en: "UNESCO status ensures sustained international demand. Limited supply of quality accommodation creates favorable room rate dynamics.", ko: "유네스코 지위가 지속적인 국제 수요를 보장합니다.", zh: "联合国教科文组织地位确保持续的国际需求。", lo: "ສະຖານະ" } },
      { icon: "building", title: { en: "Premium residential enclave", ko: "프리미엄 주거 단지", zh: "高端住宅区", lo: "ທີ່ຢູ່ອາໄສ" }, text: { en: "Growing foreign resident and retiree interest in Luang Prabang. Long-term lease structures accommodate international buyers.", ko: "루앙프라방에 대한 외국인 거주자 및 은퇴자 관심 증가.", zh: "外国居民和退休人员对琅勃拉邦的兴趣日益增长。", lo: "ຄວາມສົນໃຈ" } },
    ],
    advantages: { en: ["UNESCO status", "Direct flights", "Limited supply", "Heritage brand"], ko: ["유네스코", "직항", "제한 공급", "헤리티지"], zh: ["联合国教科文组织", "直飞航班", "供应有限", "遗产品牌"], lo: ["ຢູເນສໂກ", "ຖ້ຽວບິນ"] },
  },
];
