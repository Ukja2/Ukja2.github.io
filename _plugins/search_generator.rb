module Jekyll
  class SearchGenerator < Generator
    safe true
    priority :low

    def generate(site)
      search_data = []
      
      site.posts.docs.each do |post|
        search_data << {
          'title' => post.data['title'],
          'url' => post.url,
          'content' => post.content,
          'excerpt' => post.excerpt
        }
      end

      File.write('search.json', JSON.generate(search_data))
    end
  end
end 