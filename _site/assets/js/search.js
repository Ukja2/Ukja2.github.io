// 검색 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchData = [];

    // 현재 페이지의 base URL 가져오기
    const baseUrl = window.location.pathname.includes('/Ukja2.github.io') 
        ? '/Ukja2.github.io' 
        : '';

    // 검색 데이터 로드
    fetch(`${baseUrl}/search.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('검색 데이터를 불러올 수 없습니다.');
            }
            return response.json();
        })
        .then(data => {
            searchData = data;
            console.log('검색 데이터 로드 완료:', searchData.length, '개의 항목');
        })
        .catch(error => {
            console.error('검색 데이터 로드 중 오류 발생:', error);
            searchResults.innerHTML = '<p>검색 기능을 사용할 수 없습니다. 잠시 후 다시 시도해주세요.</p>';
        });

    // 검색 입력 이벤트 처리
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '<p>검색어를 2글자 이상 입력해주세요.</p>';
            return;
        }

        const results = searchData.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                   item.content.toLowerCase().includes(query);
        });

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

            return `
                <div class="search-result-item">
                    <a href="${baseUrl}${result.url}">
                        <h3>${result.title}</h3>
                        <p>${truncatedContent}</p>
                    </a>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = html;
    }
}); 