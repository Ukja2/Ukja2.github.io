// 검색 기능 구현
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    let searchData = [];

    // 검색 데이터 로드
    fetch('/search.json')
        .then(response => response.json())
        .then(data => {
            searchData = data;
        });

    // 검색 입력 이벤트 처리
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        if (query.length < 2) {
            searchResults.innerHTML = '';
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
                    <a href="${result.url}">
                        <h3>${result.title}</h3>
                        <p>${truncatedContent}</p>
                    </a>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = html;
    }
}); 