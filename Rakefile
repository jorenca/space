# require_relative 'server'

desc 'Opens a pry console in the context of the application'
task :console do
  exec 'pry -r ./server.rb'
end

desc 'Runs the application, watching for changes in the source files'
task :run do
  exec 'rerun -p "{server.rb,app/**/*.rb}" ruby server.rb'
end

