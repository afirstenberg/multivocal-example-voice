const Multivocal = require('multivocal');
const Response = require('multivocal/lib/response');

const conf = {
  Local: {
    und: {
      Response: {
        "Action.greetings": [
          "Hello, my name is {{Voice.Name}}.",
          "Hi there, I'm {{Voice.Name}}."
        ],
        "Action.requestDiscount": [
          "I'm sorry, the best I can do is {{Voice.discount}} percent."
        ],
        "Action.requestSupervisor": [
          {
            Base: {Set: true},
            NextNode: ".",
            Template: {
              VoiceRequested: "{{Voice.manager}}"
            }
          },
          "(One moment.)[voice:'{{Voice.Name}}'] [500ms]",
          "(Please hang on a moment.)[voice:'{{Voice.Name}}'] [750ms]",
        ],
        "Action.whoIsBoss": [
          "My supervisor is {{Voice.manager}}.",
          "My manager is {{Voice.manager}}."
        ],
        "Error.noManager": [
          "I'm the senior person."
        ]
      },
      Suffix: {
        "Action.greetings": [
          "How can I help you?",
          "What can I do for you?",
          "How may I be of [250ms] assistance?"
        ],
        "Action.requestSupervisor": [""],
        "Error.noManager": [
          "What can ++I++ do for you?"
        ],
        Default: [
          "What else can I do for you?",
          "How else can I help you?"
        ]
      }
    }
  }
}

function handleNoManager( env ){
  env.Outent = "Error.noManager";
  return Multivocal.handleDefault( env );
}

function handleManager( env ){
  const manager = env.Voice.manager;
  if( !manager ){
    return handleNoManager( env );
  }

  return Multivocal.handleDefault( env );
}

exports.init = function(){
  Multivocal.addActionHandler( "requestSupervisor", handleManager );
  Multivocal.addActionHandler( "whoIsBoss", handleManager );
  new Multivocal.Config.Simple( conf );
}
