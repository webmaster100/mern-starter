import Question from './models/question';
import Answer from './models/answer';

export default function () {
  Question.count().exec((err, count) => {
    if (count > 0) {
      return;
    }
    const question1 = new Question({
      name: 'John',
      title: 'How do I get the current absolute URL in Ruby on Rails?',
      slug: 'get-current-url-from-ruby-on-rails',
      cuid: 'qikqgkv4q01ck7453ualdn3hd',
      content: `How can I get the current absolute URL in my Ruby on Rails view?
        The request.request_uri only returns the relative URL.` });
    const question2 = new Question({
      name: 'Michael',
      title: 'Stop text from moving when resizing window',
      slug: 'stop-text-from-resizing-window',
      cuid: 'wikqgkv4q01ck7453ualdn3hf',
      content: `When I resize my window all the elements move around and I want them to stay in the right place.
       How do I do that? Do I need to put them in a wrapper or something?`
    });
    Question.create(question1, (error, questionSaved) => {
      const answer1 = new Answer({ questionCuid:questionSaved.cuid, name: 'Dan', cuid: '1ikqgkv4q01ck7453ualdn3hd', content: `You should use request.original_url to get the current URL.` });
      Answer.create(answer1, (error,answerSaved) => {
        questionSaved.answers =  questionSaved.answers.concat([answerSaved.cuid]);
        questionSaved.save((err, saved) => {
          const answer2 = new Answer({ questionCuid:questionSaved.cuid, name: 'Michael',  cuid: '2ikqgkv4q01ck7453ualdn3hd', content: `I think that the Ruby on Rails 3.0 method is now request.fullpath.` });
          Answer.create(answer2, (error,answerSaved) => {
            saved.answers = saved.answers.concat([answerSaved.cuid]);
            saved.save();
          });
        });
      });

    });
    Question.create(question2, (error, savedquestion2) => {
      const answer3 = new Answer({ questionCuid:savedquestion2.cuid, name: 'John',  cuid: '3ikqgkv4q01ck7453ualdn3hd', content: `You should use request.original_url to get the current URL.` });
      Answer.create(answer3, (error,answerSaved) => {
          savedquestion2.answers = [answerSaved.cuid];
          savedquestion2.save();
      });

    });
  });
}
