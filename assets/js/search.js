// 검색 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchData = [];

    // 현재 페이지의 경로를 기준으로 search.json의 경로 계산
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);
    const searchJsonPath = pathSegments.length > 0 
        ? `/${pathSegments[0]}/search.json`
        : '/search.json';

    // 검색 데이터 로드
    fetch(searchJsonPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('검색 데이터를 불러올 수 없습니다.');
            }
            return response.json();
        })
        .then(data => {
            searchData = data;
            console.log('검색 데이터 로드 완료:', searchData.length, '개의 항목');
            console.log('첫 번째 항목:', searchData[0]); // 데이터 구조 확인
        })
        .catch(error => {
            console.error('검색 데이터 로드 중 오류 발생:', error);
            searchResults.innerHTML = '<p>검색 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>';
        });

    // 검색 입력 이벤트 처리
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        console.log('검색어:', query); // 검색어 로깅

        if (query.length < 2) {
            searchResults.innerHTML = '<p>검색어를 2글자 이상 입력해주세요.</p>';
            return;
        }

        const results = searchData.filter(item => {
            const titleMatch = item.title.toLowerCase().includes(query);
            const contentMatch = item.content.toLowerCase().includes(query);
            console.log('항목 검색:', item.title, '제목 일치:', titleMatch, '내용 일치:', contentMatch);
            return titleMatch || contentMatch;
        });

        console.log('검색 결과 수:', results.length); // 결과 수 로깅
        displayResults(results);
    });

    // 검색 결과 표시
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<p>검색 결과가 없습니다.</p>';
            return;
        }

        const html = results.map(result => {
            // 본문에서 첫 번째 문장만 추출
            const firstSentence = result.content.split(/[.!?]+/)[0];
            // 문장이 너무 길면 자르기
            const truncatedContent = firstSentence.length > 100 
                ? firstSentence.substring(0, 100) + '...' 
                : firstSentence;

            // URL 처리
            let url = result.url;
            if (!url.startsWith('/')) {
                url = '/' + url;
            }
            if (pathSegments.length > 0) {
                url = '/' + pathSegments[0] + url;
            }
            console.log('결과 URL:', url); // URL 로깅

            return `
                <div class="search-result-item">
                    <a href="${url}">
                        <h3>${result.title}</h3>
                        <p>${truncatedContent}</p>
                    </a>
                </div>
            `;
        }).join('');

        console.log('생성된 HTML:', html); // HTML 로깅
        searchResults.innerHTML = html;
        console.log('searchResults 요소:', searchResults); // 요소 로깅
    }
}); 