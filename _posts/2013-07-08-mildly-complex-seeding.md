---
title: Mildly Complex Rails Seeding with YAML
layout: post
comments: true
tags:
  - Ruby on Rails
---
It's crunch time here at [Launch Academy][1]. Our projects have to be up and running with databases that will, you know, actually *show off* the functionality that we've worked 10 weeks to achieve. This means seeding, and depending on the complexity of our models and associations, seeding can go from a simple one-line script to, well, something like this:

```ruby
module Seeders
  module Lessons
    class << self
      def seed
        Lesson.destroy_all
        lessons = []

        base_path = 'db/seed_data'
        Dir.glob(Rails.root.join(base_path, 'lessons', '*.yml')) do |file|
          lesson = YAML.load_file(file)
          this_lesson = Lesson.create(title: lesson['title'], summary: lesson['summary'])
          lessons << this_lesson
          lesson['activities'].each_with_index do |activity, index|
            completable = []

            if activity['type'] == 'Assignment'
              completable = Assignment.create do |assignment|
                assignment.title = activity['title']
                assignment.summary = activity['summary']
                assignment.instructions = activity['instructions']
                assignment.url = activity['url']
                assignment.assignment_type = activity['assignment_type']
              end
            elsif activity['type'] == 'Challenge'
              completable = Challenge.create do |challenge|
                challenge.title = activity['title']
              end
              activity['cards'].each do |card|
                new_card = Card.create do |c|
                  c.title = card['title']
                  c.instructions = card['instructions']
                  c.problem = card['problem']
                  c.solution_type = card['solution_type']
                  c.snippet = card['snippet'] if card['snippet'].present?
                end
                card['solutions'].each do |solution|

                  if card['solution_type'] == 'string'
                    sol = new_card.solution_strings.create do |solution_string|
                      solution_string.regex = solution['regex']
                      solution_string.canonical = true if solution['canonical']
                    end
                  elsif card['solution_type'] == 'position'
                    sol = new_card.solution_positions.create do |solution_position|
                      solution_position.start_position = solution['start_position']
                      solution_position.end_position = solution['end_position']
                    end
                  end

                  completable.cards << new_card
                end
              end
            end

            Activity.create do |lesson_activity|
              lesson_activity.completable = completable
              lesson_activity.lesson = this_lesson
              lesson_activity.position = index + 1
            end
          end
        end

        lessons
      end
    end
  end
end
```

This is the seeder for my project: [Memworks][2]. A major part of the app is lessons, each of which has assignments and challenges. There's a lot of content, and my first approach was to just shove it all in big Ruby objects and `require` the relevant source files. I decided to shift to a [YAML][3] approach when the Ruby hashes became so large as to become unwieldy.
<span id="more"></span>

Since YAML supports arrays, we can leverage this to indicate associations in our models. Memworks lessons are YAML files with a structure like this:

```yaml
title: "some title"
summary: "some summary"

assignments:
-
  title: "first assignment"
-
  title: "second assignment"
```

My script iterates through these YAML arrays and associates the assignments with their parent lesson. This is extremely handy with multiply nested hierarchies like mine, because YAML files are easily read and easily edited. Also, there's great support for [multiline strings][4]. Multiline strings in YAML are smart about their indent level, so unlike Ruby, you don't have to de-indent your big blocks of text.

Happy seeding!

[1]: http://www.launchacademy.com/
[2]: http://www.memworks.com/
[3]: http://www.yaml.org/
[4]: http://michael.f1337.us/2010/03/30/482836205/
