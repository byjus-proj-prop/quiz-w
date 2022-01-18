class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
  // escreva aqui o código para ocultar os elementos da questão
    question.hide();
    // escreva o código aqui para mudar a cor de fundo
    c="white";
    // escreva o código para exibir um cabeçalho indicando o resultado do Quiz
    text("resultado...");
    // chame getContestantInfo () aqui
    contestant.getPlayerInfo();

    // escreva a condição para verificar se contestantInfor não é indefinido
    if(allContestants != undefined) {
      console.log(allContestants);
    
      // escreva aqui o código para adicionar uma nota
      for(let i = 1; i <= contestantCount; i++) {
        let curPlayer = allContestants["contestant"+i];
        if(curPlayer["answer"]=="2") {
          textSize(45);
          fill("green");
          text("você acertou!!!",325,250)
        } else {
          textSize(45);
          fill("red");
          text("você errou...",325,250);
        }
      }
    }
    // escreva o código para destacar o competidor que respondeu corretamente
    
  }

}
