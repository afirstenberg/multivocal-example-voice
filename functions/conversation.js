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
            NextNode: "."
          },
          "(One moment.)[voice:'{{Voice.Name}}'] [500ms]"
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

function noManager( env ){
  env.Outent = "Error.noManager";
  return Multivocal.handleDefault( env );
}

function handleRequestSupervisor( env ){
  const manager = env.Voice.manager;
  if( !manager ){
    return noManager( env );
  }

  env.VoiceRequested = manager;
  return Multivocal.handleDefault( env )
    .then( env => Multivocal.loadVoice( env ) );
}

function handleWhoIsBoss( env ){
  const manager = env.Voice.manager;
  if( !manager ){
    return noManager( env );
  }

  return Multivocal.handleDefault( env );
}

exports.init = function(){
  Multivocal.addActionHandler( "requestSupervisor", handleRequestSupervisor );
  Multivocal.addActionHandler( "whoIsBoss", handleWhoIsBoss );
  new Multivocal.Config.Simple( conf );
}
