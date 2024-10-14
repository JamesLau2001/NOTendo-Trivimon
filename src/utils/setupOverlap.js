
export const setupOverlap = (player, subject, completed, questionsLoaded, setQuestionsLoaded, setCurrentScene, staticImageParams) => {
    if (!completed) {
      this.physics.add.overlap(player, subject, () => {
        
        if (!questionsLoaded) {
         
          setQuestionsLoaded(true); 
          setCurrentScene(staticImageParams.scene);
        } else {
         
          setCurrentScene(staticImageParams.scene); 
        }
      });
    } else {
      
      const staticImage = this.physics.add
        .staticImage(staticImageParams.x, staticImageParams.y, subject.texture.key)
        .setScale(staticImageParams.scale);
      staticImage.body.setSize(
        staticImage.width * staticImageParams.scale,
        staticImage.height * staticImageParams.scale
      );
      staticImage.body.setOffset(
        (staticImage.width - staticImage.width * staticImageParams.scale) / 2,
        (staticImage.height - staticImage.height * staticImageParams.scale) / 2
      );
      this.physics.add.collider(player, staticImage, () => {
        
      });
    }
  };
  
  
  setupOverlap(player, videoGame, videoGameCompleted, videoGameQuestionsLoaded, setVideoGameQuestionsLoaded, setCurrentScene, { x: 120, y: 200, scale: 0.3, scene: "VideoGameScene" });
  setupOverlap(player, science, scienceCompleted, scienceQuestionsLoaded, setScienceQuestionsLoaded, setCurrentScene, { x: 190, y: 390, scale: 0.1, scene: "ScienceScene" });
  setupOverlap(player, music, musicCompleted, musicQuestionsLoaded, setMusicQuestionsLoaded, setCurrentScene, { x: 190, y: 580, scale: 0.1, scene: "MusicScene" });
  setupOverlap(player, sport, sportCompleted, sportQuestionsLoaded, setSportQuestionsLoaded, setCurrentScene, { x: 610, y: 160, scale: 0.1, scene: "SportScene" });
  setupOverlap(player, history, historyCompleted, historyQuestionsLoaded, setHistoryQuestionsLoaded, setCurrentScene, { x: 617, y: 352, scale: 0.3, scene: "HistoryScene" });
  setupOverlap(player, animal, animalCompleted, animalQuestionsLoaded, setAnimalQuestionsLoaded, setCurrentScene, { x: 610, y: 580, scale: 0.07, scene: "AnimalScene" });
  