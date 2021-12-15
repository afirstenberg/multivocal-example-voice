
const conf = {
  Local: {
    und: {
      Voice: {
        "amazon-alexa": {
          Sarah: {
            Voice: {
              name: "Ivy"
            },
            discount: 5
          },
          Scott: {
            Voice: {
              name: "Matthew"
            },
            discount: 1,
            manager: "Sarah"
          }
        }
      }
    }
  },
  Setting: {
    Action: {
      FromIntent: {
        Global: {
          "Intent.LaunchRequest": "greetings",
          "Intent.requestDiscount": "requestDiscount",
          "Intent.requestSupervisor": "requestSupervisor",
          "Intent.whoIsBoss": "whoIsBoss"
        }
      }
    }
  }
}


const Multivocal = require('multivocal');
exports.init = function(){
  new Multivocal.Config.Simple( conf );
}