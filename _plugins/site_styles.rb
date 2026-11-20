# Load site-specific styles and image zoom without shadowing the gem's head.
require 'cgi'
require 'digest'

Jekyll::Hooks.register [:pages, :documents], :post_render do |document|
  next unless document.output_ext == '.html'

  styles = File.join(document.site.source, 'assets/css/site.css')
  next unless File.file?(styles)

  version = Digest::SHA256.file(styles).hexdigest[0, 12]
  path = "#{document.site.baseurl}/assets/css/site.css?v=#{version}"
  link = %(<link rel="stylesheet" href="#{CGI.escapeHTML(path)}">)
  if document.site.config['enable_medium_zoom']
    zoom = document.site.config.fetch('third_party_libraries').fetch('medium_zoom')
    link += %(<script defer src="#{CGI.escapeHTML(zoom.fetch('url').fetch('js'))}" integrity="#{CGI.escapeHTML(zoom.fetch('integrity').fetch('js'))}" crossorigin="anonymous"></script>)
    script = File.join(document.site.source, 'assets/js/site.js')
    if File.file?(script)
      script_version = Digest::SHA256.file(script).hexdigest[0, 12]
      script_path = "#{document.site.baseurl}/assets/js/site.js?v=#{script_version}"
      link += %(<script defer src="#{CGI.escapeHTML(script_path)}"></script>)
    end
  end
  document.output = document.output.sub('</head>', "#{link}</head>")
end
