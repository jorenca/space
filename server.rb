require 'sinatra'
require 'sinatra/namespace'


set :port, 9878
set :bind, '0.0.0.0'

set :public_folder, proc { File.join(root, 'app') }

def parse_body?(request)
  content_type = request.content_type
  method_with_body = request.put? || request.post?
  method_with_body && (!content_type || (!content_type.include?('multipart/form-data') &&
    !content_type.include?('application/x-www-form-urlencoded')))
end

def parse_params?(request)
  (request.get? || request.delete?) && !request.params.nil? && !request.params.empty?
end

before do
  @body = parse_json_camelcase(request.body.read) if parse_body?(request)
  @params = underscore_hash(request.params) if parse_params?(request)
end

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

head '/livereload' do
  status Sinatra::Application.production? ? 403 : 200
end

