// 홈 화면 태그 필터에 항상 표시할 고정 카테고리 목록.
// 글에 없는 태그를 눌러도 결과가 없을 뿐, 카테고리 자체는 여기서 관리한다.
export const CATEGORIES = ['Network', 'Server', 'Security']

// 글의 태그 중 첫 번째 고정 카테고리를 대표 카테고리로 쓴다.
export function primaryCategory(tags) {
  return tags.find((tag) => CATEGORIES.includes(tag)) ?? null
}
