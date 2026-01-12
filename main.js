/**
 * ALPSWOOD STRATEGIC EXECUTIVE REPORT - MAIN LOGIC
 * v2.1
 */

document.addEventListener('DOMContentLoaded', () => {
  initReport();
});

function initReport() {
  renderMapDots();
  renderCompetitors('all');
  renderExtraction();
  renderSWOT();
  renderRoadmap();
  renderPremiumTop5();
  renderPlaceStrategy();
  renderDoDont();
  setupInteractions();
  setupNavigation();
}

/* ==========================================================================
   STRATEGY DATABASE
   ========================================================================== */
const STRATEGY_DATA = {
  competitors: [
    {
      id: "woodstore",
      name: "우드스토어",
      category: "special",
      position: { x: 70, y: 70 },
      tags: ["합성목재", "시공연계", "Review King"],
      summary: "합성목재 시장의 압도적 상위권. 자재 판매보다 ‘시공’이라는 고부가 서비스로 전환시키는 깔때기(Funnel) 설계가 강함.",
      deepDive: {
        structure: "평당 견적 시스템(자재+시공비 패키지)으로 고객이 비교를 멈추게 만드는 구조.",
        priceLogic: "‘공장 직영/최저가’로 유입 → 실제 이익은 시공비·부자재에서 회수(마진 믹스 설계).",
        trust: "블로그/유튜브 시공 포트폴리오 누적(사진/영상 중심)로 ‘검증된 업체’ 프레임을 고정.",
        signal: "상담·문의·체류시간이 계속 발생하여 알고리즘에서 ‘전문가형’ 행동 신호 유지.",
        learn: "ALPSWOOD는 ‘재단/가공’을 단순 옵션이 아니라 ‘서비스 상품’으로 전면 배치해야 함.",
        avoid: "단순 최저가 경쟁(자재만 팔면 결국 마진이 5% 미만으로 붕괴)."
      }
    },
    {
      id: "dokdo",
      name: "독도철강목재",
      category: "material",
      position: { x: 20, y: 15 },
      tags: ["건축자재", "철물", "Bulk"],
      summary: "건축자재 백화점형. 업자에게 ‘여기서 한 번에 끝’ 인식을 심어 락인(Lock-in)시키는 전략.",
      deepDive: {
        structure: "목재 + 철물 + 연관자재를 한 번에 발주 가능하게 구성(합배송/원스톱).",
        priceLogic: "미끼 상품(구조목)은 박리, 철물/부속·연관 상품에서 이익 확보.",
        trust: "압도적 재고/창고 스케일을 보여줘 ‘품절 걱정 없음’ 신뢰를 만든다.",
        signal: "대량 구매가 많아 객단가·재구매 지표가 강함.",
        learn: "초기엔 어렵더라도 ‘구색(Assortment)’이 장기적으로 경쟁력이다.",
        avoid: "B2B식 불친절 상세/옵션은 B2C 전환에서 치명적."
      }
    },
    {
      id: "amazon",
      name: "아마존우드",
      category: "diy",
      position: { x: 85, y: 50 },
      tags: ["DIY재단", "집성목", "초보친화"],
      summary: "DIY 초보의 ‘재단 공포’를 제거하며 성장. 자재상이 아니라 ‘만들기 성공 경험’을 판다.",
      deepDive: {
        structure: "정밀 재단(CNC/패널소) 옵션을 상품 핵심으로 배치(서비스 중심).",
        priceLogic: "목재는 시장가, 재단/샌딩/라운딩 같은 가공 옵션에서 고마진 창출.",
        trust: "초보 성공 후기(사진/리뷰)를 대량 축적해 ‘나도 할 수 있다’ 신뢰를 만든다.",
        signal: "상세에서 옵션 고민 → 체류시간 증가(알고리즘에 강한 신호).",
        learn: "ALPSWOOD도 ‘초보 친화 옵션 설계 + 실패 방지 안내’가 필수.",
        avoid: "가공 품질/오차 관리 실패 시 CS 폭증(프로세스 표준화 필요)."
      }
    },

    {
      id: "poly",
      name: "폴리컴퍼니",
      category: "premium",
      position: { x: 80, y: 80 },
      tags: ["합성데크", "프리미엄", "브랜딩"],
      summary: "프리미엄만을 선택해 가격 경쟁을 버린 구조. ‘오래 쓰는 가치’로 고가를 정당화.",
      deepDive: {
        structure: "고가 자재 중심으로 카테고리를 좁히고, 비교표·연출컷으로 ‘합리적 프리미엄’ 설득.",
        priceLogic: "LCC(생애주기비용) 논리로 ‘비싸다 → 결국 싸다’로 인식 전환.",
        trust: "썸네일/폰트/톤이 통일된 브랜드 경험으로 대기업급 신뢰를 만든다.",
        signal: "지명 검색 유입이 강해 알고리즘 상단 안정성이 높다.",
        learn: "ALPSWOOD도 최소 1~2개 라인은 ‘프리미엄 룩’으로 상단 설득 구조를 만들어야 함.",
        avoid: "애매한 포지셔닝(싸지도 비싸지도 않음)이 가장 위험."
      }
    },
    {
      id: "gunwoo",
      name: "건우하우징",
      category: "material",
      position: { x: 30, y: 30 },
      tags: ["외장재", "물류", "카테고리킬러"],
      summary: "외장재 분야 카테고리 킬러. 큰 자재의 배송/운임 문제를 ‘가이드’로 해결하는 구조가 강함.",
      deepDive: {
        structure: "부피 큰 자재를 화물/택배로 표준화(운임 안내·조건)해 구매 장벽을 낮춤.",
        priceLogic: "운임 최적화/합배송 설계로 고객 총비용을 낮춰 가격 경쟁력을 만든다.",
        trust: "오프라인 활동(박람회/현장) 신뢰를 온라인 상세 구조로 전이.",
        signal: "특정 키워드 독점으로 검색-전환 루프가 강하다.",
        learn: "ALPSWOOD도 ‘긴 자재/화물’ 구매 장벽을 표준 안내로 제거해야 함.",
        avoid: "전문 용어 남발로 B2C 이해도를 떨어뜨리면 전환이 무너짐."
      }
    },
    {
      id: "woodhouse",
      name: "우드하우스몰",
      category: "diy",
      position: { x: 90, y: 60 },
      tags: ["홈데코", "감성", "연출컷"],
      summary: "목재를 ‘건축자재’가 아닌 ‘라이프스타일/홈데코’로 재정의해 감성 프리미엄을 만든다.",
      deepDive: {
        structure: "완제품/키트형 중심 구성으로 구매 난이도를 낮춤.",
        priceLogic: "감성·연출·패키징에서 ‘디자인 프리미엄’이 붙는다.",
        trust: "인스타 감성 연출컷으로 신뢰·욕구를 동시에 만든다.",
        signal: "이미지 검색/공유가 많아 외부 유입이 꾸준하다.",
        learn: "ALPSWOOD도 ‘자투리’ 상품화 + 연출컷 세트 제작이 매우 강력하다.",
        avoid: "완제품 대량 재고는 회전율 리스크가 크다."
      }
    },

    { id: "wood24", name: "우드24", category: "special", position: { x: 60, y: 65 }, tags: ["직수입", "가성비"], summary: "직수입 구조로 가격 경쟁력을 확보.", deepDive: { structure: "OEM/직수입으로 유통 단축", priceLogic: "시장가 대비 저가", trust: "물량/창고 공개", signal: "가격비교 상단", learn: "소싱이 곧 무기", avoid: "품질 이슈 시 브랜드 타격" } },
    { id: "daerim", name: "대림우드", category: "material", position: { x: 25, y: 40 }, tags: ["종합자재", "패키지"], summary: "목조주택 자재 A to Z.", deepDive: { structure: "연관구매 극대화", priceLogic: "패키지 할인", trust: "오프라인 기반", signal: "지역 유입 강세", learn: "크로스셀링 설계", avoid: "온라인 대응 느림" } },
    { id: "jaywood", name: "제이J우드", category: "premium", position: { x: 95, y: 90 }, tags: ["우드슬랩", "희소성"], summary: "희소성·장인 프레임으로 고가 판매.", deepDive: { structure: "원오브어카인드", priceLogic: "비교 불가 가격", trust: "작업 과정 공개", signal: "체류/전환 높음", learn: "스토리텔링의 힘", avoid: "장인 의존도" } },
    { id: "acewood", name: "에이스목재", category: "material", position: { x: 35, y: 25 }, tags: ["기본자재", "빠른배송"], summary: "기본기 충실, 속도 중심.", deepDive: { structure: "물류 중심", priceLogic: "박리다매", trust: "신속성", signal: "재구매", learn: "기본기", avoid: "차별점 약함" } },
    { id: "everwood", name: "EVERWOOD", category: "special", position: { x: 65, y: 60 }, tags: ["방부목", "데크"], summary: "방부목 전문 이미지.", deepDive: { structure: "한 카테고리 집중", priceLogic: "전문화", trust: "품질보증", signal: "키워드 선점", learn: "카테고리 킬러", avoid: "확장성 제한" } },
    { id: "darwin", name: "다윈씨엔아이", category: "premium", position: { x: 80, y: 85 }, tags: ["관급", "시험성적서"], summary: "근거 기반 고가 전략.", deepDive: { structure: "기술영업형", priceLogic: "고가", trust: "데이터/시험", signal: "신뢰도", learn: "근거 설득", avoid: "대중성 부족" } },
    { id: "ewood", name: "이우드", category: "special", position: { x: 75, y: 75 }, tags: ["인테리어", "디자인자재"], summary: "벽면/디자인 특화.", deepDive: { structure: "디자인 중심", priceLogic: "트렌드 마진", trust: "시공사례", signal: "이미지", learn: "연출 설득", avoid: "유행 민감" } },
    { id: "mainwood", name: "메인우드", category: "diy", position: { x: 88, y: 55 }, tags: ["소품", "데스크테리어"], summary: "소품화로 틈새 공략.", deepDive: { structure: "소품 중심", priceLogic: "감성 마진", trust: "비주얼", signal: "검색", learn: "틈새", avoid: "매출 파이 제한" } },
    { id: "mokjae", name: "목재나라", category: "material", position: { x: 15, y: 20 }, tags: ["최저가", "동네목재소"], summary: "전형적 범용형.", deepDive: { structure: "기본자재", priceLogic: "최저가 추종", trust: "업력", signal: "지역", learn: "수요 꾸준", avoid: "출혈 경쟁" } },
    { id: "woodmaru", name: "우드마루", category: "special", position: { x: 50, y: 50 }, tags: ["마루", "시공패키지"], summary: "마루 시공 패키지형.", deepDive: { structure: "시공 연계", priceLogic: "평당 가격", trust: "대리점", signal: "상담", learn: "서비스화", avoid: "하자 리스크" } },
    { id: "forest", name: "포레스토어", category: "diy", position: { x: 82, y: 45 }, tags: ["취미목공", "소분"], summary: "취미/커뮤니티형.", deepDive: { structure: "소분판매", priceLogic: "소량 단가", trust: "친밀감", signal: "팬덤", learn: "커뮤니티", avoid: "확장성 제한" } }
  ],

  // ✅ Extraction: 
  extraction: [
    {
      icon: "fa-solid fa-users-gear",
      title: "서비스화 모델",
      subtitle: "‘나무’를 파는 게 아니라 ‘가공/시공/만들기’를 팔아 마진을 만든다",
      summary:
        "상위 업체는 자재(상품) 자체가 아니라, 고객이 실패 없이 쓰게 만드는 서비스(재단/시공/만들기)를 팔아 수익 구조를 만든다. ALPSWOOD도 ‘목재 판매’가 아닌 ‘목공 서비스 파트너’로 재정의해야 한다.",
      detailHtml: `
        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-bullseye"></i> 문서 목적</div>
          <p>상위 경쟁사가 네이버에서 매출을 만드는 <strong>‘보이지 않는 메커니즘’</strong>을 해부하여 ALPSWOOD BM에 이식하기 위함.</p>
        </div>

        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-layer-group"></i> 핵심</div>
          <p>나무(자재)를 파는 것이 아니라, <strong>“나무를 자르는 서비스 / 설치를 쉽게 만드는 서비스”</strong>를 상품화하여 마진을 극대화한다.</p>
        </div>

        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-book-open"></i> Case Study : 우드스토어</div>
          <ul class="ex-ul">
            <li><strong>성공 키워드</strong> : 시공 패키지, 평당 견적</li>
            <li><strong>유입(Traffic)</strong> : ‘합성목재’, ‘데크시공’ 키워드로 유입</li>
            <li><strong>가두기(Lock-in)</strong> : 상세 상단 “자재+시공 평당 가격” 계산기 → 고객이 복잡한 자재 계산을 포기하고 ‘평당 가격’에 의존</li>
            <li><strong>수익(Profit)</strong> : 자재 마진은 낮추고, 시공 인건비 + 부자재(클립/피스)에서 고마진 확보</li>
          </ul>
        </div>

        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-book-open"></i> Case Study : 아마존우드</div>
          <ul class="ex-ul">
            <li><strong>성공 키워드</strong> : 똥손 탈출, 정밀 재단</li>
            <li><strong>공포 제거</strong> : 초보의 두려움(재단 실수, 샌딩 귀찮음)을 정면 해결</li>
            <li><strong>옵션 집요함</strong> : 재단/라운딩/샌딩 등 “이걸 다 해드립니다” 구조</li>
            <li><strong>결과</strong> : 나무값보다 가공비를 더 내도 ‘편리함’으로 만족 → 객단가 2배</li>
          </ul>
        </div>

        <div class="ex-block ex-apply">
          <div class="ex-block-title"><i class="fa-solid fa-chess"></i> ALPSWOOD 적용 포인트</div>
          <ul class="ex-ul">
            <li><strong>[실행]</strong> 상세페이지 최상단에 “재단비 포함 견적 계산기” 링크 삽입 → 톡톡 문의 유도</li>
            <li><strong>[실행]</strong> ‘나무값’과 ‘재단비’를 분리하지 말고, <strong>“재단된 선반 키트(Kit)”</strong>로 묶음 판매</li>
          </ul>
        </div>
      `
    },

    {
      icon: "fa-solid fa-won-sign",
      title: "카테고리 킬러 모델",
      subtitle: "특정 용도에서 ‘압도적 전문성’으로 비교를 멈추게 한다",
      summary:
        "가격이 아니라 ‘프레임’을 장악한다. 고객의 뇌에서 ‘비싸다’를 ‘합리적’으로 바꾸는 비교표, 근거, 비주얼 통일이 핵심이다.",
      detailHtml: `
        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-layer-group"></i> 핵심</div>
          <p>특정 용도/자재에서 <strong>‘이 분야는 여기’</strong>라는 인식을 만들면, 고객은 가격 비교 대신 ‘안전한 선택’을 한다.</p>
        </div>

        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-book-open"></i> Case Study : 폴리컴퍼니</div>
          <ul class="ex-ul">
            <li><strong>키워드</strong> : 반영구, LCC(생애주기비용), 호텔식</li>
            <li><strong>비주얼 쇼크</strong> : 창고 사진 대신 “호텔 루프탑 시공” → 프리미엄 프레임</li>
            <li><strong>논리 전환</strong> : 매년 오일 비용 vs 한 번 시공 비용 비교표로 ‘경제적’ 인식 전환</li>
            <li><strong>브랜딩</strong> : 썸네일/폰트/톤 통일로 대기업급 신뢰</li>
          </ul>
        </div>

        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-book-open"></i> Case Study : 건우하우징</div>
          <ul class="ex-ul">
            <li><strong>키워드</strong> : 외장재 물류 혁신, 화물 착불 해결</li>
            <li><strong>페인포인트 해결</strong> : 화물 택배비 폭탄 문제를 ‘가이드/조건/옵션’으로 해결</li>
            <li><strong>구색</strong> : 외장재를 한 곳에 모아 합배송 유도 → 발주 단순화</li>
          </ul>
        </div>

        <div class="ex-block ex-apply">
          <div class="ex-block-title"><i class="fa-solid fa-chess"></i> ALPSWOOD 적용 포인트</div>
          <ul class="ex-ul">
            <li><strong>[실행]</strong> 저가 구조목도 포트폴리오는 “프리미엄 공간 연출컷”으로 설득</li>
            <li><strong>[실행]</strong> “왜 비싼가”보다 <strong>“왜 싼 게 리스크인가”</strong>를 비교표로 설명</li>
            <li><strong>[실행]</strong> 합배송 소품(피스/본드/오일/사포 등) 50종+ 확보 → 객단가↑ 배송 저항↓</li>
          </ul>
        </div>
      `
    },

    {
      icon: "fa-solid fa-image",
      title: "틈새·감성 모델",
      subtitle: "기능이 아니라 ‘나무가 있는 공간의 분위기’를 판다",
      summary:
        "같은 목재도 네이밍·연출·사용 맥락을 바꾸면 가격이 달라진다. 자재를 ‘라이프스타일 아이템’으로 재정의하면 외부 유입과 공유가 폭발한다.",
      detailHtml: `
        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-layer-group"></i> 핵심</div>
          <p>기능보다 <strong>‘공간의 감정’</strong>을 팔아야 한다. 누끼가 아니라 연출컷, 제품명이 아니라 사용 장면이 전환을 만든다.</p>
        </div>

        <div class="ex-block">
          <div class="ex-block-title"><i class="fa-solid fa-book-open"></i> Case Study : 우드하우스몰</div>
          <ul class="ex-ul">
            <li><strong>키워드</strong> : 데스크테리어, 카페 감성</li>
            <li><strong>재포지셔닝</strong> : 자투리를 “인센스 홀더/모니터 받침” 등으로 명명 → 가치 10배</li>
            <li><strong>연출</strong> : 맥북/커피/조명과 함께 촬영 → 이미지 검색 유입</li>
          </ul>
        </div>

        <div class="ex-block ex-apply">
          <div class="ex-block-title"><i class="fa-solid fa-chess"></i> ALPSWOOD 적용 포인트</div>
          <ul class="ex-ul">
            <li><strong>[실행]</strong> 구조목 자투리를 샌딩 후 “캠핑용/수리용/빈티지 블럭”으로 상품화</li>
            <li><strong>[실행]</strong> 최소 10개 ‘연출컷 템플릿’을 만들어 모든 상세페이지에 적용</li>
          </ul>
        </div>

        <div class="ex-block ex-fail">
          <div class="ex-block-title"><i class="fa-solid fa-triangle-exclamation"></i> 구조적 실패 패턴 (반면교사)</div>
          <ul class="ex-ul">
            <li><strong>키워드 나열형 제목</strong> : 정체성 없음 → 클릭률 낮음</li>
            <li><strong>경고문이 먼저</strong> : 반품불가/착불이 상단 → 이탈 1순위</li>
            <li><strong>옵션이 공부형</strong> : 1번/2번/3번… 고객이 표를 봐야 함 → 구매 포기</li>
            <li><strong>교훈</strong> : 고객에게 ‘공부’를 시키지 말 것. 직관 없으면 B2C는 떠난다.</li>
          </ul>
        </div>

        <div class="ex-block ex-win">
          <div class="ex-block-title"><i class="fa-solid fa-trophy"></i> ALPSWOOD 승리 공식 (요약)</div>
          <ul class="ex-ul">
            <li><strong>유입</strong> : “구조목/각재” → “문제 해결형 패키지 키워드”</li>
            <li><strong>전환</strong> : 상단 실사 후기 + 불안 제거(파손 재발송/환불) 배치</li>
            <li><strong>수익</strong> : 목재 10% + 정밀 재단 90% + 부자재 50% → 종합 이익률 구조</li>
            <li><strong>자산화</strong> : 후기/도면을 블로그·플레이스에 2차 가공 → Flywheel</li>
          </ul>
          <p class="ex-quote">결론: 경쟁사는 ‘나무’를 파는 게 아니라 <strong>기술·편리함·감성·프리미엄 프레임</strong>을 판다.</p>
        </div>
      `
    }
  ],

  swot: {
    s: {
      title: "구조적 강점 (Strength)",
      items: [
        { head: "유연한 소싱 역량", text: "대형 경쟁사 대비 경직된 소싱이 아니라, 특수목/자투리목 등 틈새 자재를 빠르게 매입·상품화할 수 있는 유연함을 보유." },
        { head: "고객 중심 관점", text: "‘어떻게 팔까’보다 ‘고객이 무엇을 만들까’를 먼저 고민하는 관점이 강점. 이는 상세페이지 친절함/옵션 설계로 연결되어 전환율을 끌어올리는 핵심 무기가 될 수 있음." }
      ]
    },
    w: {
      title: "치명적 약점 (Weakness)",
      items: [
        { head: "리뷰/판매 이력 부족", text: "네이버 알고리즘의 핵심인 누적 판매·리뷰 자산이 부족. 초기 유입 고객의 불안(이탈)을 유발하는 치명적 약점." },
        { head: "브랜드 정의 공백", text: "소비자에게 ‘ALPSWOOD = 무엇을 잘하는 곳’이 즉시 떠오르지 않음. ‘또 하나의 목재상’으로 보일 위험." }
      ]
    },
    o: {
      title: "시장 기회 (Opportunity)",
      items: [
        { head: "Micro-DIY 트렌드", text: "데스크테리어, 간단 수리, 캠핑/차박 튜닝 등 소소한 목공 수요 증가. 기존 건자재상은 귀찮아서 대응이 느림 → 기회." },
        { head: "B2C 신뢰 공백", text: "기존 업체들의 불친절·불투명 배송·거친 포장에 지친 고객이 ‘친절하고 깔끔한 대안’을 찾는 흐름이 존재." }
      ]
    },
    t: {
      title: "예상 위협 (Threat)",
      items: [
        { head: "C-커머스 잠식", text: "알리/테무가 공구/철물/소품 영역을 잠식. 단순 규격품만으로는 가격 경쟁에서 필패." },
        { head: "물류비 상승", text: "부피가 큰 목재 특성상 택배비 인상은 마진을 즉시 압박. 물류 표준화/가이드 없으면 ‘팔수록 손해’ 구조가 될 수 있음." }
      ]
    },
    matrix: [
      { type: "so", title: "니치 선점", text: "유연한 소싱(S)으로 Micro-DIY 니치(O)에 맞는 ‘소분/전용 키트/정밀 재단’ 상품을 출시해 경쟁사가 무시하는 틈새를 선점." },
      { type: "st", title: "부가가치 방어", text: "서비스·정보 콘텐츠(S)로 저가 공산품(T)과 차별화. ‘관리/설치/가공’까지 포함한 전문가형 패키지로 방어." },
      { type: "wo", title: "리뷰 시딩(강제 축적)", text: "리뷰/브랜드 공백(W)을 메우기 위해 커뮤니티 기반 체험단(O) 운영. ‘30일 내 리뷰 100개’ 같은 숫자 목표로 신뢰 자본을 강제 주입." },
      { type: "wt", title: "린 물류/포트폴리오", text: "물류비(T)가 큰 대형 자재는 가이드 완성 전까지 제한하고, 부피 대비 단가 높은 ‘정밀/프리미엄/서비스형 상품’으로 안정화." }
    ]
  },

  roadmap: [
    {
      phase: "Phase 1: Survival",
      time: "Month 0~1",
      title: "기반 구축 + 신뢰 시딩",
      kpi: "리뷰 50+ / Store Pick 100 / 톡톡 응답률 95%+",
      list: [
        "상세페이지 표준 템플릿 제작(포장/검수/옵션 구조 통일)",
        "체험단 20명 운영(블로그+스토어 리뷰 연동)",
        "재단 서비스 오차율 0% 프로세스 확립(검수 체크리스트)",
        "기본 상품 50종 등록(SEO/썸네일/옵션 UX 최적화)",
        "배송 가이드(착불/화물/포장) ‘고객 언어’로 재작성"
      ]
    },
    {
      phase: "Phase 2: Traction",
      time: "Month 1~3",
      title: "패턴 발견 + 니치 킬(전환 구조 고정)",
      kpi: "Power Grade / 월 매출 1,000만 / 재구매 10%+",
      list: [
        "유입 키워드 분석 후 전환율 높은 ‘효자 상품’ 3개 고정",
        "효자 상품에 광고(SA) 집중 + 기획전 구성(세트/패키지)",
        "톡톡 상담 데이터를 FAQ/가이드 콘텐츠로 전환(블로그 자산화)",
        "리뷰 유도 시나리오(포장 카드/QR/구매 후 7일 메시지)",
        "부자재 번들 판매(오일/사포/피스)로 객단가 상승"
      ]
    },
    {
      phase: "Phase 3: Scale-Up",
      time: "Month 3~6",
      title: "구조 확장 + 브랜드 락인(Flywheel)",
      kpi: "Big Power 진입 / 카테고리 Top10 / 문의→구매 전환 25%+",
      list: [
        "연관 구매 상품 200종 확장(합배송으로 배송 저항 감소)",
        "ALPSWOOD 전용 PB 상품(DIY 키트) 3종 출시",
        "유튜브 숏츠/릴스 시작(제작 과정 ASMR, 검수/포장 신뢰)",
        "B2B 등급제 도입(정기 구매처 확보/단가표/납기 고정)",
        "플레이스/블로그를 ‘리뷰·현장·후기 아카이브’로 운영"
      ]
    }
  ],

  premiumTop5: [
  {
    id: "samsung",
    name: "삼성전자",
    icon: "fa-solid fa-mobile-screen",
    tags: ["결정장애 제거", "비교표", "CTA 설계"],
    summary: "‘선택 피로’를 제거해 전환을 올리는 구조. 모델 비교→추천 시나리오→CTA로 고객을 밀어준다.",
    deepDive: {
      structure: "상세페이지 안에서 ‘비교→추천→선택’이 끝나는 구조(외부 검색 필요 없음).",
      signal: "체류시간↑, 스크롤 깊이↑, 클릭 이벤트↑ → 알고리즘 평가에 유리한 행동 신호를 만든다.",
      playbook: [
        "ALPSWOOD는 ‘규격/용도/가공’ 비교표를 상단에 배치 (2~3개 추천만 남긴다).",
        "옵션은 ‘1번/2번’이 아니라 ‘용도 기준’으로 재정의 (선반용/가벽용/캠핑용).",
        "CTA는 1개만 강하게: ‘도면 보내기→재단 견적 받기(톡톡)’ 같은 다음 행동 고정."
      ],
      kpi: ["상세 체류시간 30%↑", "장바구니율 15%↑", "문의 전환율 8%↑"],
      risk: "비교표가 너무 길면 오히려 이탈. ‘추천 3개’ 원칙 유지."
    }
  },
  {
    id: "lg",
    name: "LG전자",
    icon: "fa-solid fa-tv",
    tags: ["데모", "가이드", "불안 제거"],
    summary: "고객이 ‘이거 사도 되나?’를 고민하기 전에, 페이지 안에서 불안을 해소해버리는 구조.",
    deepDive: {
      structure: "기능 설명이 아니라 ‘상황별 가이드(내게 맞는 선택)’로 구성.",
      signal: "FAQ 클릭/탭 이동/영상 재생 등 상호작용이 많아 행동 점수가 좋아진다.",
      playbook: [
        "ALPSWOOD는 ‘배송/파손/휨/옹이’ 불안을 먼저 해결하는 ‘신뢰 블록’을 상단에 배치.",
        "‘포장 프로세스’ + ‘검수 기준’ + ‘불량 대응’ 3단 구성으로 신뢰를 만든다.",
        "사용 시나리오(가벽/선반/수리)별로 필요한 규격을 ‘자동 추천’ 텍스트로 안내."
      ],
      kpi: ["구매 망설임 감소", "반품/클레임률 감소", "리뷰 긍정 비율 증가"],
      risk: "정보가 흩어지면 복잡해 보임 → ‘탭/아코디언’으로 접었다 펼치게."
    }
  },
  {
    id: "ohou",
    name: "오늘의집",
    icon: "fa-solid fa-couch",
    tags: ["UGC", "후기사진", "커뮤니티"],
    summary: "리뷰를 ‘부록’이 아니라 메인 컨텐츠로 만든다. 사진후기가 곧 상세페이지다.",
    deepDive: {
      structure: "UGC(후기사진/시공사례)를 구매 동선 한가운데 배치.",
      signal: "후기 클릭/사진 확대/스크롤 반복 → 체류·상호작용 신호 강화.",
      playbook: [
        "ALPSWOOD는 ‘실제 재단/시공 사진’ 섹션을 상단 근처에 고정한다.",
        "후기 요청을 ‘구걸’이 아니라 ‘성공 경험 설계’로 만든다(설명서/QR/가이드 제공).",
        "후기사진을 블로그/플레이스와 교차 업로드(플라이휠)."
      ],
      kpi: ["리뷰 전환 2배", "사진리뷰 비중↑", "재구매율↑"],
      risk: "후기 품질이 낮으면 역효과 → ‘후기 가이드(촬영 예시)’ 제공."
    }
  },
  {
    id: "kurly",
    name: "마켓컬리",
    icon: "fa-solid fa-carrot",
    tags: ["프리미엄 정당화", "큐레이션", "신뢰"],
    summary: "가격이 비싸도 ‘왜 이게 좋은지’를 설득해 프리미엄을 정당화한다.",
    deepDive: {
      structure: "‘선별 기준(큐레이션)’을 먼저 보여줘서 가격 논쟁을 끝낸다.",
      signal: "브랜드 검색/재방문이 늘어 알고리즘에서 ‘지명도’가 생긴다.",
      playbook: [
        "ALPSWOOD는 ‘등급/선별 기준’을 명확히: 휨/크랙/옹이 허용 기준 공개.",
        "저가 경쟁 대신 ‘안전한 배송/정밀 재단/검수’로 프리미엄 이유를 만든다.",
        "‘싼 게 왜 위험한지’ 비교표(반품/파손/작업시간 비용)를 제시."
      ],
      kpi: ["객단가↑", "브랜드 검색↑", "불신 감소"],
      risk: "근거가 없으면 말뿐 → 사진/체크리스트/데이터로 증명."
    }
  },
  {
    id: "sidiz",
    name: "시디즈",
    icon: "fa-solid fa-chair",
    tags: ["데이터", "실험", "검증"],
    summary: "기능을 말로 설명하지 않고 ‘데이터/실험’으로 증명한다.",
    deepDive: {
      structure: "전/후 비교, 실험 결과, 테스트 근거를 시각화해서 신뢰를 만든다.",
      signal: "콘텐츠 저장/공유/스크롤 등 ‘학습형 행동’이 늘어난다.",
      playbook: [
        "ALPSWOOD는 ‘휨 방지/내구/방부’ 등을 ‘테스트 느낌’으로 보여준다(간단 비교).",
        "‘포장 전/후’ ‘재단 정확도’ 같은 팩트를 이미지/아이콘으로 시각화.",
        "‘품질 체크리스트 PDF’ 같은 다운로드형 신뢰 자산 제작."
      ],
      kpi: ["고가 전환↑", "CS 감소", "신뢰도↑"],
      risk: "과장하면 역풍 → ‘가능한 범위’만 정확히."
    }
  }
],


  placeBlog: {
    place: {
      title: "네이버플레이스 전략 (ALPSWOOD)",
      content: `
        <div class="pb-head">
          <div class="pb-badge">NAVER PLACE</div>
          <h3>오프라인 신뢰를 “온라인 증거”로 고정하는 채널</h3>
          <p class="pb-sub">
            플레이스는 단순 지도 등록이 아니라, <strong>‘방문/문의/구매를 결정시키는 신뢰 페이지’</strong>입니다.
            특히 목재 업종은 “실제 작업/포장/검수”를 보여줘야 방문과 발주가 일어납니다.
          </p>
        </div>

        <div class="pb-card">
          <div class="pb-card-title"><i class="fa-solid fa-stethoscope"></i> 현재 문제 진단</div>
          <ul class="pb-list">
            <li><strong>증거 부족</strong> : 작업 현장/포장/검수/창고 스케일이 거의 안 보이면 ‘신뢰’가 생기지 않음</li>
            <li><strong>정보 구조 빈약</strong> : 방문 이유(서비스, 강점, 프로세스)가 한눈에 안 들어오면 “그냥 목재상”으로 끝남</li>
            <li><strong>리뷰 설계 부재</strong> : 영수증 리뷰를 ‘강제로 쌓는 구조’가 없으면 알고리즘 상단 진입이 느림</li>
            <li><strong>검색 키워드 미세조정 부족</strong> : ‘목재/제재/재단’ 같은 핵심 키워드가 카테고리/설명/게시물에 분산되어야 함</li>
          </ul>
        </div>

        <div class="pb-grid-2">
          <div class="pb-card">
            <div class="pb-card-title"><i class="fa-solid fa-camera-retro"></i> 사진/영상 “필수 세트”</div>
            <ul class="pb-list">
              <li><strong>1)</strong> 창고 전경(재고 스케일) + 작업대(재단 장비)</li>
              <li><strong>2)</strong> 포장 과정(코너 보호/완충/박스) → 파손 불안 제거</li>
              <li><strong>3)</strong> 검수(옹이/크랙/휨 체크) → 품질 신뢰</li>
              <li><strong>4)</strong> 시공/제작 전후(Before/After) → 결과 증거</li>
              <li><strong>5)</strong> 대표 서비스(정밀 재단/소분/세트) 한 장 요약컷</li>
            </ul>
          </div>

          <div class="pb-card">
            <div class="pb-card-title"><i class="fa-solid fa-location-dot"></i> 정보 구조(상단 고정 문구)</div>
            <ul class="pb-list">
              <li><strong>한 줄 정의</strong> : “정밀 재단 + 안전 포장 + 초보 친화 옵션”</li>
              <li><strong>강점 3개</strong> : ±1mm 재단 / 파손 재발송 / 상담 10분 내 응답</li>
              <li><strong>서비스 항목</strong> : 재단·가공 / 소분·키트 / 화물·택배 가이드</li>
              <li><strong>문의 CTA</strong> : “도면 보내면 10분 내 견적/옵션 추천”</li>
            </ul>
          </div>
        </div>

        <div class="pb-card pb-strong">
          <div class="pb-card-title"><i class="fa-solid fa-bullseye"></i> 0~6주 로드맵 (플레이스)</div>
          <div class="pb-timeline">
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 1</span><span class="pb-kpi">사진 20장 업로드</span></div>
              <div class="pb-step-body">작업/포장/검수/창고/전후 사진 세트 구축 + 소개 문구/서비스 항목 정리</div>
            </div>
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 2</span><span class="pb-kpi">리뷰 이벤트 시작</span></div>
              <div class="pb-step-body">영수증 리뷰 “즉시 보상” 구조(소형 샌딩패드/오일 샘플/피스 소량) + QR 안내 카드 동봉</div>
            </div>
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 3~4</span><span class="pb-kpi">후기 콘텐츠 8건</span></div>
              <div class="pb-step-body">실제 주문 사례(도면→가공→포장→배송) 시리즈화. “실패 없는 주문법”으로 가이드 작성</div>
            </div>
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 5~6</span><span class="pb-kpi">키워드 확장</span></div>
              <div class="pb-step-body">“재단/소분/캠핑/수리/선반/가벽” 등 문제 해결형 키워드를 게시물/사진 설명에 자연스럽게 분산</div>
            </div>
          </div>
        </div>

        <div class="pb-card pb-risk">
          <div class="pb-card-title"><i class="fa-solid fa-triangle-exclamation"></i> 절대 하면 안 되는 실수</div>
          <ul class="pb-list">
            <li><strong>가격만 강조</strong> : 플레이스는 가격보다 “신뢰 증거”가 먼저임</li>
            <li><strong>경고문 상단 배치</strong> : “착불/반품불가”를 첫 화면에 놓으면 이탈</li>
            <li><strong>사진 품질 방치</strong> : 어두운 창고 사진만 있으면 프리미엄/신뢰가 안 생김</li>
          </ul>
        </div>
      `
    },

    blog: {
      title: "네이버블로그 전략 (alpswood.blog)",
      content: `
        <div class="pb-head">
          <div class="pb-badge">NAVER BLOG</div>
          <h3>구매 “이전 단계” 고객을 가로채는 정보 채널</h3>
          <p class="pb-sub">
            블로그의 목표는 상품 홍보가 아니라, <strong>문제 해결 콘텐츠로 유입 → 스토어/톡톡으로 전환</strong>입니다.
            특히 목재는 “어떻게 주문해야 하는지”가 가장 큰 장벽이라, 가이드형 콘텐츠가 곧 매출입니다.
          </p>
        </div>

        <div class="pb-card">
          <div class="pb-card-title"><i class="fa-solid fa-stethoscope"></i> 현재 흔한 실수(노출 안 되는 패턴)</div>
          <ul class="pb-list">
            <li><strong>제품 홍보형 글</strong> : “입고/재고/가격” 중심 글은 검색에서 경쟁력이 약함</li>
            <li><strong>키워드가 좁음</strong> : ‘방부목/각재’만 반복하면 Red Ocean에서 묻힘</li>
            <li><strong>전환 동선 부재</strong> : 글을 읽고도 “다음 행동(문의/견적/구매)”이 없으면 매출로 안 이어짐</li>
          </ul>
        </div>

        <div class="pb-grid-2">
          <div class="pb-card">
            <div class="pb-card-title"><i class="fa-solid fa-magnet"></i> 반드시 먹히는 콘텐츠 구조</div>
            <ul class="pb-list">
              <li><strong>1) 문제형 제목</strong> : “침대 다리 휘었을 때 수리법”, “가벽 프레임 계산”</li>
              <li><strong>2) 실패 원인</strong> : 왜 깨지고/휘고/삐뚤어지는지 원인 설명</li>
              <li><strong>3) 해결 단계</strong> : 재단 치수/부자재/설치 순서 (사진+도식)</li>
              <li><strong>4) 체크리스트</strong> : 배송/포장/검수/오차 허용치</li>
              <li><strong>5) CTA</strong> : “도면 보내면 10분 내 추천 규격/견적”</li>
            </ul>
          </div>

          <div class="pb-card">
            <div class="pb-card-title"><i class="fa-solid fa-tags"></i> 키워드 전략(확장)</div>
            <ul class="pb-list">
              <li><strong>레드오션</strong> : 구조목/각재/방부목</li>
              <li><strong>블루오션</strong> : 가벽 프레임, 선반 보강, 캠핑카 침상, 캣타워 수리, 데스크테리어</li>
              <li><strong>전환 키워드</strong> : “재단 요청”, “치수 추천”, “도면 견적”, “소분 구매”</li>
              <li><strong>지역 결합</strong> : 김해/부산/창원 + 재단/목재/제재</li>
            </ul>
          </div>
        </div>

        <div class="pb-card pb-strong">
          <div class="pb-card-title"><i class="fa-solid fa-calendar-check"></i> 4주 운영 루틴(실행 표준)</div>
          <div class="pb-timeline">
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 1</span><span class="pb-kpi">기둥 글 2개</span></div>
              <div class="pb-step-body">“침목/방부목 사용법”, “재단 주문법” 같은 기준 글(가이드)을 만들고 계속 업데이트</div>
            </div>
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 2</span><span class="pb-kpi">문제 해결 글 2개</span></div>
              <div class="pb-step-body">수리/보강/설치 문제를 해결하는 글(체크리스트 포함) + 톡톡 CTA 고정</div>
            </div>
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 3</span><span class="pb-kpi">주문 사례 2개</span></div>
              <div class="pb-step-body">실제 고객 사례(도면→가공→포장→배송)를 스토리로 작성(후기 이미지 포함)</div>
            </div>
            <div class="pb-step">
              <div class="pb-step-top"><span class="pb-week">Week 4</span><span class="pb-kpi">키워드 확장</span></div>
              <div class="pb-step-body">상위 노출 키워드 분석 후 비슷한 문제형 키워드를 10개 확장해서 다음 달 캘린더에 반영</div>
            </div>
          </div>
        </div>

        <div class="pb-card pb-risk">
          <div class="pb-card-title"><i class="fa-solid fa-triangle-exclamation"></i> 블로그에서 절대 하지 말 것</div>
          <ul class="pb-list">
            <li><strong>상품만 나열</strong> : “판매글”로 보이면 체류/공유가 약해 노출이 안 됨</li>
            <li><strong>전문용어 남발</strong> : 초보는 이해 못하면 바로 닫음 → 쉬운 언어 + 도식</li>
            <li><strong>CTA 숨김</strong> : 문의/견적/구매 다음 행동이 없으면 유입이 그냥 사라짐</li>
          </ul>
        </div>
      `
    }
  },

  dodont: {
    doList: [
      "상세페이지 첫 화면에서 ‘불안 제거(파손/오차/환불)’를 먼저 끝내라",
      "재단/가공을 ‘옵션’이 아니라 ‘서비스 상품’으로 전면 배치하라",
      "구매 후 7일 시점에 리뷰/사진을 요청하는 시나리오를 고정하라",
      "합배송 가능한 부자재 라인업으로 객단가를 설계하라",
      "블로그/플레이스로 후기·사례를 자산화해 플라이휠을 만들라"
    ],
    dontList: [
      "경고문(반품불가/착불)을 상세 상단에 두지 마라",
      "가격만으로 경쟁하지 마라(마진 붕괴 + 브랜드 저하)",
      "옵션을 1번/2번/3번 공부형으로 만들지 마라",
      "사진 품질을 방치하지 마라(신뢰가 바로 무너진다)",
      "모든 고객에게 팔려고 하지 마라(초보와 업자는 언어가 다르다)"
    ]
  }
};

/* ==========================================================================
   RENDERING FUNCTIONS
   ========================================================================== */

function renderMapDots() {
  const layer = document.getElementById('map-dots-layer');
  if (!layer) return;

  layer.innerHTML = '';
  STRATEGY_DATA.competitors.forEach(comp => {
    const dot = document.createElement('div');
    dot.className = `map-dot`;
    dot.style.left = comp.position.x + '%';
    dot.style.bottom = comp.position.y + '%';
    dot.innerHTML = `<div class="map-label">${comp.name}</div>`;
    dot.onclick = () => openModal(comp);
    layer.appendChild(dot);
  });

  const target = document.createElement('div');
  target.className = 'map-dot target';
  target.style.left = '85%';
  target.style.bottom = '85%';
  target.innerHTML = `<div class="map-label">ALPSWOOD (Target)</div>`;
  layer.appendChild(target);
}

function renderCompetitors(filter) {
  const grid = document.getElementById('competitor-grid');
  if (!grid) return;

  grid.innerHTML = '';
  const filtered = filter === 'all'
    ? STRATEGY_DATA.competitors
    : STRATEGY_DATA.competitors.filter(c => c.category === filter);

  filtered.forEach(c => {
    const card = document.createElement('div');
    card.className = 'comp-card fade-up';
    card.onclick = () => openModal(c);

    const tagsHtml = (c.tags || []).map(t => `<span class="c-badge">${t}</span>`).join('');
    card.innerHTML = `
      <div class="comp-header">
        <div>
          <div class="comp-name">${c.name}</div>
          <span class="comp-cat">${categoryLabel(c.category)}</span>
        </div>
        <i class="fa-solid fa-arrow-up-right-from-square" style="color:var(--text-muted); font-size:0.85rem;"></i>
      </div>
      <div class="comp-badges">${tagsHtml}</div>
      <p class="comp-summary">${c.summary}</p>
      <div class="click-hint">클릭하여 구조 분석 보기</div>
    `;
    grid.appendChild(card);
  });
}

function categoryLabel(cat) {
  const map = {
    material: "자재형",
    diy: "DIY/서비스형",
    premium: "프리미엄형",
    special: "특화형"
  };
  return map[cat] || cat;
}

/* ✅ Extraction (NEW) : 카드 클릭 → Modal 창 */
function renderExtraction() {
  const list = document.getElementById('extraction-list');
  if (!list) return;
  list.innerHTML = '';

  // modal elements
  const modal = document.getElementById('exModal');
  const modalTitle = document.getElementById('exModalTitle');
  const modalSubtitle = document.getElementById('exModalSubtitle');
  const modalBadge = document.getElementById('exModalBadge');
  const modalBody = document.getElementById('exModalBody');

  const openModal = (item) => {
    modalTitle.textContent = item.title || '';
    modalSubtitle.textContent = item.subtitle || '';
    modalBadge.textContent = item.badge || '핵심';
    modalBody.innerHTML = item.detailHtml || '';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ex-no-scroll');
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ex-no-scroll');
  };

  // cards render
  STRATEGY_DATA.extraction.forEach((item, idx) => {
    const safeId = `ex-card-${idx}`;

    list.innerHTML += `
      <article class="ex-card2 fade-up" id="${safeId}">
        <div class="ex-card2__glow"></div>

        <div class="ex-card2__top">
          <div class="ex-card2__icon"><i class="${item.icon}"></i></div>
          <div class="ex-card2__meta">
            <div class="ex-card2__titleRow">
              <h4 class="ex-card2__title">${item.title}</h4>
              <span class="ex-chip">Click</span>
            </div>
            <div class="ex-card2__subtitle">${item.subtitle}</div>
          </div>
        </div>

        <p class="ex-card2__summary">${item.summary}</p>

        <div class="ex-card2__actions">
          <button class="ex-open" type="button" data-ex-open="${idx}">
            상세 창 열기
            <span class="ex-open__arrow">↗</span>
          </button>

          <div class="ex-miniHint">
            <span class="dot"></span>
            <span>모바일에서도 창으로 깔끔하게 열립니다</span>
          </div>
        </div>
      </article>
    `;
  });

  // open buttons
  document.querySelectorAll('[data-ex-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = Number(btn.getAttribute('data-ex-open'));
      const item = STRATEGY_DATA.extraction[idx];
      if (!item) return;
      openModal(item);
    });
  });

  // close handlers
  modal.querySelectorAll('[data-ex-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  // esc close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}


function renderSWOT() {
  const renderQuad = (id, data, icon) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `<div class="swot-header"><i class="${icon}"></i> ${data.title}</div>`;
    data.items.forEach(item => {
      el.innerHTML += `
        <div class="swot-item">
          <h5>${item.head}</h5>
          <p>${item.text}</p>
        </div>
      `;
    });
  };

  renderQuad('swot-s', STRATEGY_DATA.swot.s, 'fa-solid fa-bolt');
  renderQuad('swot-w', STRATEGY_DATA.swot.w, 'fa-solid fa-link-slash');
  renderQuad('swot-o', STRATEGY_DATA.swot.o, 'fa-solid fa-lightbulb');
  renderQuad('swot-t', STRATEGY_DATA.swot.t, 'fa-solid fa-triangle-exclamation');

  const matrixEl = document.getElementById('swot-matrix');
  if (!matrixEl) return;
  matrixEl.innerHTML = '';

  STRATEGY_DATA.swot.matrix.forEach(m => {
    matrixEl.innerHTML += `
      <div class="matrix-card ${m.type} fade-up">
        <span class="matrix-tag">${m.type.toUpperCase()} 전략</span>
        <h4 style="margin-bottom:0.5rem;">${m.title}</h4>
        <p style="font-size:0.95rem; color:var(--text-secondary); line-height:1.7;">${m.text}</p>
      </div>
    `;
  });
}

function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  if (!container) return;
  container.innerHTML = '';

  STRATEGY_DATA.roadmap.forEach(phase => {
    const checklist = phase.list.map(l => `<li><i class="fa-regular fa-square-check"></i> ${l}</li>`).join('');
    container.innerHTML += `
      <div class="rm-item fade-up">
        <div class="rm-marker"></div>
        <div class="rm-content">
          <span class="rm-phase">${phase.time} | ${phase.phase}</span>
          <h3 class="rm-title">${phase.title}</h3>
          <div class="rm-kpi-box">
            <strong>KPI:</strong> ${phase.kpi}
          </div>
          <ul class="rm-checklist">${checklist}</ul>
        </div>
      </div>
    `;
  });
}

function renderPremiumTop5() {
  const grid = document.getElementById('premium-grid');
  if (!grid) return;

  grid.innerHTML = '';

  STRATEGY_DATA.premiumTop5.forEach(p => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'prem-card prem-click';
    card.setAttribute('aria-label', `${p.name} 인사이트 열기`);
    card.onclick = () => openPremiumModal(p);

    const tags = (p.tags || []).slice(0, 3).map(t => `<span class="prem-pill">${t}</span>`).join('');

    card.innerHTML = `
      <div class="prem-icon"><i class="${p.icon}"></i></div>
      <div class="prem-name">${p.name}</div>
      <div class="prem-lesson">${p.summary}</div>
      <div class="prem-pills">${tags}</div>
      <div class="prem-cta">클릭하여 상세 인사이트 보기 <i class="fa-solid fa-arrow-right"></i></div>
    `;

    grid.appendChild(card);
  });
}

function openPremiumModal(p) {
  if (!modalRoot) return;

  const d = p.deepDive || {};
  const play = (d.playbook || []).map(x => `<li><i class="fa-solid fa-bullseye"></i> ${x}</li>`).join('');
  const kpis = (d.kpi || []).map(x => `<span class="m-kpi">${x}</span>`).join('');

  modalContentBox.innerHTML = `
    <div class="m-hero prem-hero">
      <span class="m-cat">TOP BENCHMARK · ${p.tags ? p.tags.join(' · ') : ''}</span>
      <h2 class="m-title">${p.name} 인사이트</h2>
      <p class="m-summary">${p.summary}</p>
      <div class="prem-kpi-row">${kpis}</div>
    </div>

    <div class="m-section">
      <div class="m-section-title"><i class="fa-solid fa-sitemap"></i> 구조(Structure)</div>
      <div class="m-point"><p>${d.structure || ''}</p></div>
    </div>

    <div class="m-section">
      <div class="m-section-title"><i class="fa-solid fa-wave-square"></i> 알고리즘 신호(Signal)</div>
      <div class="m-point"><p>${d.signal || ''}</p></div>
    </div>

    <div class="m-section" style="background:rgba(255,255,255,0.02);">
      <div class="m-section-title"><i class="fa-solid fa-screwdriver-wrench"></i> ALPSWOOD 적용 Playbook</div>
      <ul class="prem-playbook">
        ${play}
      </ul>
    </div>

    <div class="m-section">
      <div class="m-section-title"><i class="fa-solid fa-triangle-exclamation"></i> 주의(Risk)</div>
      <div class="m-point"><p>${d.risk || ''}</p></div>
    </div>
  `;

  modalRoot.classList.add('active');
  document.body.classList.add('modal-open');
  modalRoot.setAttribute('aria-hidden', 'false');
}



function renderPlaceStrategy() {
  const p = document.getElementById('place-strategy');
  const b = document.getElementById('blog-strategy');
  if (!p || !b) return;

  p.innerHTML = `
    <div class="pb-wrap">
      ${STRATEGY_DATA.placeBlog.place.content}
    </div>
  `;

  b.innerHTML = `
    <div class="pb-wrap">
      ${STRATEGY_DATA.placeBlog.blog.content}
    </div>
  `;
}

function renderDoDont() {
  const grid = document.getElementById('dodont-grid');
  if (!grid) return;

  const dos = STRATEGY_DATA.dodont.doList.map(i => `<li><i class="fa-solid fa-check"></i> ${i}</li>`).join('');
  const donts = STRATEGY_DATA.dodont.dontList.map(i => `<li><i class="fa-solid fa-xmark"></i> ${i}</li>`).join('');

  grid.innerHTML = `
    <div class="dodont-box do fade-up">
      <h3>DO</h3>
      <ul class="dodont-list">${dos}</ul>
    </div>
    <div class="dodont-box dont fade-up">
      <h3>DON'T</h3>
      <ul class="dodont-list">${donts}</ul>
    </div>
  `;
}

/* ==========================================================================
   MODAL UX
   ========================================================================== */
const modalRoot = document.getElementById('modal-root');
const modalOverlay = document.getElementById('modal-overlay');
const modalContentBox = document.getElementById('modal-body-injection');
const modalCloseBtn = document.querySelector('.modal-close-btn');

function openModal(data) {
  if (!modalRoot) return;

  const deep = data.deepDive || {};
  const html = `
    <div class="m-hero">
      <span class="m-cat">${categoryLabel(data.category)} · ${(data.tags || []).join(' · ')}</span>
      <h2 class="m-title">${data.name}</h2>
      <p class="m-summary">${data.summary || ""}</p>
    </div>

    <div class="m-section">
      <div class="m-section-title"><i class="fa-solid fa-layer-group"></i> 구조 분석</div>
      <div class="m-grid-2">
        <div class="m-point">
          <h5>비즈니스 구조</h5>
          <p>${deep.structure || "-"}</p>
        </div>
        <div class="m-point">
          <h5>가격/이익 로직</h5>
          <p>${deep.priceLogic || "-"}</p>
        </div>
      </div>
    </div>

    <div class="m-section">
      <div class="m-section-title"><i class="fa-solid fa-fingerprint"></i> 신뢰 & 알고리즘 신호</div>
      <div class="m-grid-2">
        <div class="m-point">
          <h5>신뢰 구축</h5>
          <p>${deep.trust || "-"}</p>
        </div>
        <div class="m-point">
          <h5>알고리즘 신호</h5>
          <p>${deep.signal || "-"}</p>
        </div>
      </div>
    </div>

    <div class="m-section" style="background:rgba(255,255,255,0.02);">
      <div class="m-section-title"><i class="fa-solid fa-chess"></i> ALPSWOOD 적용</div>
      <div class="m-grid-2">
        <div class="m-app-box" style="border-color:var(--accent-green);">
          <h5 style="color:var(--accent-green);">배워야 할 점</h5>
          <p>${deep.learn || "-"}</p>
        </div>
        <div class="m-app-box" style="border-color:var(--accent-red);">
          <h5 style="color:var(--accent-red);">피해야 할 점</h5>
          <p>${deep.avoid || "-"}</p>
        </div>
      </div>
    </div>
  `;

  modalContentBox.innerHTML = html;
  modalRoot.classList.add('active');
  document.body.classList.add('modal-open');
  modalRoot.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modalRoot.classList.remove('active');
  document.body.classList.remove('modal-open');
  modalRoot.setAttribute('aria-hidden', 'true');
}

function setupInteractions() {
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalRoot.classList.contains('active')) closeModal();
  });

  const filterBtns = document.querySelectorAll('.filter-chip');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderCompetitors(e.target.dataset.filter);
    });
  });
}

/* ==========================================================================
   NAVIGATION
   ========================================================================== */
function setupNavigation() {
  const navMenu = document.getElementById('nav-menu');
  const sections = document.querySelectorAll('section');
  const progress = document.querySelector('.scroll-progress-bar');

  if (navMenu) {
    navMenu.innerHTML = '';
    sections.forEach(sec => {
      if (!sec.dataset.nav) return;
      const li = document.createElement('li');
      li.innerHTML = `<a href="#${sec.id}">${sec.dataset.nav}</a>`;
      navMenu.appendChild(li);
    });
  }

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY;

    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollY / winHeight) * 100;
    if (progress) progress.style.width = scrolled + "%";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
    });

    document.querySelectorAll('.nav-menu a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href').includes(current)) a.classList.add('active');
    });
  });

  // Mobile Drawer
  const drawerBtn = document.querySelector('.mobile-menu-btn');
  const closeDrawerBtn = document.querySelector('.drawer-close');
  const drawerOverlay = document.querySelector('.mobile-nav-overlay');
  const drawerLinks = document.querySelector('.drawer-links');

  if (drawerBtn) {
    if (drawerLinks && navMenu) drawerLinks.innerHTML = navMenu.innerHTML;

    const toggleDrawer = (open) => {
      document.body.classList.toggle('mobile-nav-active', open);
    };

    drawerBtn.addEventListener('click', () => toggleDrawer(true));
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    if (drawerLinks) {
      drawerLinks.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => toggleDrawer(false));
      });
    }
  }
}
