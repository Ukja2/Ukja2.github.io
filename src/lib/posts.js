// 마크다운 파일을 읽어서 frontmatter(title, date, tags 등)와
// 본문(content)으로 나눠주는 아주 단순한 파서.
// gray-matter 대신 직접 구현해서 브라우저 번들에 불필요한 Node 의존성을 넣지 않는다.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw.trim() }

  const [, frontmatter, content] = match
  const data = {}

  frontmatter.split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      value = value.replace(/^["']|["']$/g, '')
    }

    data[key] = value
  })

  return { data, content: content.trim() }
}

// 본문에서 처음 나오는 마크다운 이미지(![설명](경로))의 경로를 썸네일로 쓴다.
function findFirstImage(content) {
  const match = content.match(/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?/)
  return match ? match[1] : ''
}

function slugify(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

const modules = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = slugify(path)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      order: data.order !== undefined ? Number(data.order) : null,
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      description: data.description || '',
      thumbnail: findFirstImage(content),
      content,
    }
  })
  .sort((a, b) => {
    // 날짜 최신순 정렬이 우선이고, 날짜가 같을 때만 order 값(낮은 숫자가 먼저)으로 순서를 정한다.
    const dateDiff = new Date(b.date) - new Date(a.date)
    if (dateDiff !== 0) return dateDiff
    const orderA = a.order ?? Infinity
    const orderB = b.order ?? Infinity
    return orderA - orderB
  })

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
