// 마크다운 파일을 읽어서 frontmatter(title, date, tags, description)와
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
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      description: data.description || '',
      content,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug)
}
