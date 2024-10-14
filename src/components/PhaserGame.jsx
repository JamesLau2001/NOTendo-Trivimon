import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import ScienceScene from "../Scenes/ScienceScene";
import VideoGameScene from "../Scenes/VideoGameScene";
import MusicScene from "../Scenes/MusicScene";
import SportScene from "../Scenes/SportScene";
import HistoryScene from "../Scenes/HistoryScene";
import AnimalScene from "../Scenes/AnimalScene";
import BossScene from "../Scenes/BossScene";
import CreditScene from "../Scenes/CreditScene";
import { setBodySizeAndOffset } from "../utils/setBodySizeAndOffset";
import { addStaticImage } from "../utils/addStaticImage";
import { updateUser, findUser } from "../data/mongoApi";
import { collisionTiles } from "../data/collisionsNew";

const PhaserGame = ({
  username,
  saveData,
  characterSelected,
  setDisplayText,
}) => {
  const gameRef = useRef(null);
  const [currentScene, setCurrentScene] = useState("FirstScene");

  const [videoGameCompleted, setVideoGameCompleted] = useState(
    saveData.videoGamesCompleted
  );
  const [scienceCompleted, setScienceCompleted] = useState(
    saveData.scienceCompleted
  );
  const [musicCompleted, setMusicCompleted] = useState(saveData.musicCompleted);
  const [sportCompleted, setSportCompleted] = useState(
    saveData.sportsCompleted
  );
  const [historyCompleted, setHistoryCompleted] = useState(
    saveData.historyCompleted
  );
  const [animalCompleted, setAnimalCompleted] = useState(
    saveData.animalsCompleted
  );
  const [bossCompleted, setBossCompleted] = useState(false);

  const [scienceQuestionsLoaded, setScienceQuestionsLoaded] = useState(false);
  const [musicQuestionsLoaded, setMusicQuestionsLoaded] = useState(false);
  const [videoGameQuestionsLoaded, setVideoGameQuestionsLoaded] =
    useState(false);
  const [sportQuestionsLoaded, setSportQuestionsLoaded] = useState(false);
  const [historyQuestionsLoaded, setHistoryQuestionsLoaded] = useState(false);
  const [animalQuestionsLoaded, setAnimalQuestionsLoaded] = useState(false);
  const [bossQuestionsLoaded, setBossQuestionsLoaded] = useState(false);

  let [enteredScience, setEnteredScience] = useState(false);
  let [enteredVideoGame, setEnteredVideoGame] = useState(false);
  let [enteredHistory, setEnteredHistory] = useState(false);
  let [enteredAnimal, setEnteredAnimal] = useState(false);
  let [enteredMusic, setEnteredMusic] = useState(false);
  let [enteredSport, setEnteredSport] = useState(false);

  let [enteredBoss, setEnteredBoss] = useState(false);

  let [showSport, setShowSport] = useState(true);
  let [showScience, setShowScience] = useState(true);
  let [showAnimal, setShowAnimal] = useState(true);
  let [showVideoGame, setShowVideoGame] = useState(true);
  let [showMusic, setShowMusic] = useState(true);
  let [showHistory, setShowHistory] = useState(true);

  const [finishedBadges, setFinishedBadges] = useState(false);

  useEffect(() => {
    let player;
    let badges;
    let cursors;
    let background;
    let obstacles;
    let mouseText;
    let music;
    let videoGame;
    let science;
    let sport;
    let history;
    let animal;
    let boss;
    let bar;
    let collide;
    let saveButton;
    let collisionMap = [];

    const FirstScene = {
      preload: function () {
        this.load.image("background", "../../backgrounds/trivimon.png");
        this.load.image("collision", "../../collision.png");

        this.load.spritesheet(
          "playerUp",
          `../../player/${characterSelected}playerUp.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );
        this.load.spritesheet(
          "playerDown",
          `../../player/${characterSelected}playerDown.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );
        this.load.spritesheet(
          "playerLeft",
          `../../player/${characterSelected}playerLeft.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );
        this.load.spritesheet(
          "playerRight",
          `../../player/${characterSelected}playerRight.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerUpRight",
          `../../player/${characterSelected}playerUpRight.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerDownRight",
          `../../player/${characterSelected}playerDownRight.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerUpLeft",
          `../../player/${characterSelected}playerUpLeft.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.spritesheet(
          "playerDownLeft",
          `../../player/${characterSelected}playerDownLeft.png`,
          {
            frameWidth: 15,
            frameHeight: 21.33,
          }
        );

        this.load.image("tree", "../../tree.png");
        this.load.image("block", "../../collision.png");

        this.load.image("music", "../../houses/music.png");
        this.load.image("science", "../../houses/science.png");
        this.load.image("videoGame", "../../houses/vgs.png");
        this.load.image("sport", "../../houses/sport.png");
        this.load.image("history", "../../houses/history.png");
        this.load.image("animal", "../../houses/animal.png");

        this.load.image("bar", "../../badges/BadgePlaceholder.png");
        this.load.image("musicBadge", "../../badges/Music.png");
        this.load.image("scienceBadge", "../../badges/Science.png");
        this.load.image("videogameBadge", "../../badges/videoGame.png");
        this.load.image("animalBadge", "../../badges/Animal.png");
        this.load.image("sportBadge", "../../badges/Sports.png");
        this.load.image("historyBadge", "../../badges/History.png");
        this.load.image("saveDisc", "../../badges/saveDisc.png");

        this.load.audio("lake", "../../music/lake.mp3");
        this.load.audio("calm", "../../music/gameMusic.mp3");
        this.load.audio("save", "../../music/save.mp3");
        this.load.audio("error", "../../music/error.mp3");
      },

      create: function () {
        cursors = this.input.keyboard.createCursorKeys();

        background = this.add
          .image(0, 0, "background")
          .setScale(2.7)
          .setOrigin(0, 0);

        this.music = this.sound.add("calm", {
          loop: true,
          volume: 0.1,
        });

        this.music.play();

        this.music.setLoop(true);
        this.music.play();

        if (enteredAnimal) {
          setDisplayText("Animal defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(2200, 1660, "playerDown")
            .setScale(2.5);
        } else if (enteredHistory) {
          setDisplayText("History defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(730, 1310, "playerDown")
            .setScale(2.5);
        } else if (enteredMusic) {
          setDisplayText("Music defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(905, 2070, "playerDown")
            .setScale(2.5);
        } else if (enteredVideoGame) {
          setDisplayText("Video Games defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(2780, 1390, "playerDown")
            .setScale(2.5);
        } else if (enteredScience) {
          setDisplayText("Science defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(1630, 970, "playerDown")
            .setScale(2.5);
        } else if (enteredSport) {
          setDisplayText("Sport defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(2240, 840, "playerDown")
            .setScale(2.5);
        } else if (enteredBoss) {
          setDisplayText("Boss defeated you, Try Again?");
          this.player = this.physics.add
            .sprite(2914, 720, "playerDown")
            .setScale(2.5);
        } else {
          this.player = this.physics.add
            .sprite(843, 606, "playerDown")
            .setScale(2.5);
        }
        setEnteredAnimal(false);
        setEnteredMusic(false);
        setEnteredScience(false);
        setEnteredVideoGame(false);
        setEnteredHistory(false);
        setEnteredSport(false);
        setEnteredBoss(false);

        this.player.setCollideWorldBounds(false);

        mouseText = this.add.text(10, 10, "", {
          font: "16px Courier",
          fill: "#ffffff",
        });

        this.cameras.main.setBounds(
          0,
          0,
          background.width * 2.7,
          background.height * 2.7
        );

        this.cameras.main.startFollow(this.player);

        music = addStaticImage(this, 905, 1890, "music", 0.1);
        science = addStaticImage(this, 1630, 875, "science", 0.1);
        videoGame = addStaticImage(this, 2780, 1210, "videoGame", 0.1);
        sport = addStaticImage(this, 2240, 720, "sport", 0.1);
        history = addStaticImage(this, 730, 1080, "history", 0.3);
        animal = addStaticImage(this, 2200, 1490, "animal", 0.07);

        setBodySizeAndOffset(music, 0.1, 0.1);
        setBodySizeAndOffset(science, 0.1, 0.1);
        setBodySizeAndOffset(videoGame, 0.1, 0.1);
        setBodySizeAndOffset(sport, 0.1, 0.1);
        setBodySizeAndOffset(history, 0.2, 0.2);
        setBodySizeAndOffset(animal, 0.07, 0.07);
        history.setVisible(false);
        animal.setVisible(false);
        sport.setVisible(false);
        music.setVisible(false);
        videoGame.setVisible(false);
        science.setVisible(false);

        if (!videoGameCompleted) {
          this.physics.add.overlap(this.player, videoGame, () => {
            setDisplayText(
              "Why was the computer cold? Because it left its Windows open!"
            );

            if (!videoGameQuestionsLoaded) {
              setVideoGameQuestionsLoaded(true);
              setCurrentScene("VideoGameScene");
            } else {
              setCurrentScene("VideoGameScene");
            }
          });
        } else {
          const staticVideoGame = this.physics.add
            .staticImage(2780, 1210, "videoGame")
            .setScale(0.1);
          staticVideoGame.body.setSize(
            staticVideoGame.width * 0.1,
            staticVideoGame.height * 0.1
          );
          staticVideoGame.body.setOffset(
            (staticVideoGame.width - staticVideoGame.width * 0.1) / 2,
            (staticVideoGame.height - staticVideoGame.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticVideoGame, () => {});
          staticVideoGame.setVisible(false);
        }

        if (!scienceCompleted) {
          this.physics.add.overlap(this.player, science, () => {
            setDisplayText(
              "Why can't you trust an atom? Because they make up everything!"
            );

            if (!scienceQuestionsLoaded) {
              setScienceQuestionsLoaded(true);
              setCurrentScene("ScienceScene");
            } else {
              setCurrentScene("ScienceScene");
            }
          });
        } else {
          const staticScience = this.physics.add
            .staticImage(1630, 875, "science")
            .setScale(0.1);
          staticScience.body.setSize(
            staticScience.width * 0.1,
            staticScience.height * 0.1
          );
          staticScience.body.setOffset(
            (staticScience.width - staticScience.width * 0.1) / 2,
            (staticScience.height - staticScience.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticScience, () => {});
          staticScience.setVisible(false);
        }

        if (!musicCompleted) {
          this.physics.add.overlap(this.player, music, () => {
            setDisplayText(
              "Why did the piano break up with the accordion? Because they just weren’t in tune anymore!"
            );

            if (!musicQuestionsLoaded) {
              setMusicQuestionsLoaded(true);
              setCurrentScene("MusicScene");
            } else {
              setCurrentScene("MusicScene");
            }
          });
        } else {
          const staticMusic = this.physics.add
            .staticImage(905, 1890, "music")
            .setScale(0.1);
          staticMusic.body.setSize(
            staticMusic.width * 0.1,
            staticMusic.height * 0.1
          );
          staticMusic.body.setOffset(
            (staticMusic.width - staticMusic.width * 0.1) / 2,
            (staticMusic.height - staticMusic.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticMusic, () => {});
          staticMusic.setVisible(false);
        }

        if (!sportCompleted) {
          this.physics.add.overlap(this.player, sport, () => {
            setDisplayText(
              "Why did the golfer bring two pairs of pants? In case he got a hole in one!"
            );

            if (!sportQuestionsLoaded) {
              setSportQuestionsLoaded(true);
              setCurrentScene("SportScene");
            } else {
              setCurrentScene("SportScene");
            }
          });
        } else {
          const staticSport = this.physics.add
            .staticImage(2240, 720, "sport")
            .setScale(0.1);
          staticSport.body.setSize(
            staticSport.width * 0.1,
            staticSport.height * 0.1
          );
          staticSport.body.setOffset(
            (staticSport.width - staticSport.width * 0.1) / 2,
            (staticSport.height - staticSport.height * 0.1) / 2
          );
          this.physics.add.collider(this.player, staticSport, () => {});
          staticSport.setVisible(false);
        }

        if (!historyCompleted) {
          setEnteredHistory(false);
          this.physics.add.overlap(this.player, history, () => {
            setDisplayText(
              "Why was the medieval knight always tired? Because he worked on knight shifts!"
            );

            if (!historyQuestionsLoaded) {
              setHistoryQuestionsLoaded(true);
              setCurrentScene("HistoryScene");
            } else {
              setCurrentScene("HistoryScene");
            }
          });
        } else {
          const staticHistory = this.physics.add
            .staticImage(730, 1080, "history")
            .setScale(0.2);
          staticHistory.body.setSize(
            staticHistory.width * 0.2,
            staticHistory.height * 0.2
          );
          staticHistory.body.setOffset(
            (staticHistory.width - staticHistory.width * 0.2) / 2,
            (staticHistory.height - staticHistory.height * 0.2) / 2
          );
          this.physics.add.collider(this.player, staticHistory, () => {});
          staticHistory.setVisible(false);
        }

        if (!animalCompleted) {
          this.physics.add.overlap(this.player, animal, () => {
            setDisplayText(
              "Why don’t elephants use computers? Because they’re afraid of the mouse!"
            );

            if (!animalQuestionsLoaded) {
              setAnimalQuestionsLoaded(true);
              setCurrentScene("AnimalScene");
            } else {
              setCurrentScene("AnimalScene");
            }
          });
        } else {
          const staticAnimal = this.physics.add
            .staticImage(2200, 1490, "animal")
            .setScale(0.07);

          staticAnimal.body.setSize(
            staticAnimal.width * 0.07,
            staticAnimal.height * 0.07
          );
          staticAnimal.body.setOffset(
            (staticAnimal.width - staticAnimal.width * 0.07) / 2,
            (staticAnimal.height - staticAnimal.height * 0.07) / 2
          );
          this.physics.add.collider(this.player, staticAnimal, () => {});
          staticAnimal.setVisible(false);
        }

        obstacles = this.physics.add.staticGroup();
        obstacles.create(280, 68, "tree").setScale(0.5).refreshBody();
        obstacles.create(540, 68, "tree").setScale(0.5).refreshBody();

        collide = this.physics.add.staticGroup();
        for (let i = 0; i < collisionTiles.length; i += 100) {
          collisionMap.push(collisionTiles.slice(i, 100 + i));
        }

        for (let i = 0; i < collisionMap.length; i++) {
          for (let j = 0; j < collisionMap[i].length; j++) {
            if (collisionMap[i][j] !== 0) {
              collide
                .create(j * 12 * 2.7, i * 12 * 2.7, "collision")
                .setScale(2.7)
                .setVisible(false)
                .refreshBody();
            }
          }
        }

        this.physics.add.collider(this.player, collide, () => {});

        this.bar = this.add
          .image(700, 585, "bar")
          .setScrollFactor(0)
          .setScale(1);

        this.badges = this.add.group();
        let badgeX = 700;
        const badgeY = 600;

        if (scienceCompleted) {
          if (showScience) {
            setDisplayText("Well Done! Science Badge Earned!");
            setShowScience(false);
          }

          const scienceBadge = this.add
            .image(badgeX - 133, badgeY, "scienceBadge")
            .setScale(1)
            .setScrollFactor(0);
          this.badges.add(scienceBadge);
        }
        if (sportCompleted) {
          if (showSport) {
            setDisplayText("Well Done! Sport Badge Earned!");
            setShowSport(false);
          }

          const sportBadge = this.add
            .image(badgeX - 80, badgeY, "sportBadge")
            .setScale(0.122)
            .setScrollFactor(0);
          this.badges.add(sportBadge);
        }
        if (videoGameCompleted) {
          if (showVideoGame) {
            setDisplayText("Well Done! Video Game Badge Earned!");
            setShowVideoGame(false);
          }

          const videogameBadge = this.add
            .image(badgeX - 26, badgeY, "videogameBadge")
            .setScale(0.84)
            .setScrollFactor(0);
          this.badges.add(videogameBadge);
        }
        if (musicCompleted) {
          if (showMusic) {
            setDisplayText("Well Done! Music Badge Earned!");
            setShowMusic(false);
          }

          const musicBadge = this.add
            .image(badgeX + 29, badgeY, "musicBadge")
            .setScale(0.6)
            .setScrollFactor(0);
          this.badges.add(musicBadge);
        }
        if (animalCompleted) {
          if (showAnimal) {
            setDisplayText("Well Done! Animal Badge Earned!");
            setShowAnimal(false);
          }

          const animalBadge = this.add
            .image(badgeX + 80, badgeY, "animalBadge")
            .setScale(1.15)
            .setScrollFactor(0);
          this.badges.add(animalBadge);
        }
        if (historyCompleted) {
          if (showHistory) {
            setDisplayText("Well Done! History Badge Earned!");
            setShowHistory(false);
          }

          const historyBadge = this.add
            .image(badgeX + 135, badgeY, "historyBadge")
            .setScale(0.7)
            .setScrollFactor(0);
          this.badges.add(historyBadge);
        }

        this.physics.add.collider(this.player, obstacles, () => {});

        this.coordText = this.add.text(10, 10, "Coordinates: (0, 0)", {
          fontSize: "16px",
          fill: "#ffffff",
        });

        cursors = this.input.keyboard.createCursorKeys();

        saveButton = this.add
          .image(860, 556, "saveDisc")
          .setScrollFactor(0)
          .setScale(0.5)

          .setInteractive();
        saveButton.on("pointerdown", () => {
          updateUser(username, {
            animalsCompleted: animalCompleted,
            historyCompleted,
            musicCompleted,
            scienceCompleted,
            sportsCompleted: sportCompleted,
            videoGamesCompleted: videoGameCompleted,
          })
            .then(() => {
              this.music = this.sound.add("save", {
                loop: false,
                volume: 0.5,
              });

              this.music.play();
              setDisplayText("Game Saved Successfully!");
            })
            .catch(() => {
              this.music = this.sound.add("error", {
                loop: false,
                volume: 0.5,
              });
              this.music.play();
              setDisplayText("Save Failed");
            });
        });

        if (
          videoGameCompleted &&
          musicCompleted &&
          historyCompleted &&
          animalCompleted &&
          scienceCompleted &&
          animalCompleted
        ) {
          setFinishedBadges(true);
          this.time.delayedCall(2000, () => {
            setDisplayText(
              "All badges earned, you may now challenge the boss !!!"
            );
            boss = addStaticImage(this, 2914, 638, "tree", 0.1);
            boss.setVisible(false);
            setBodySizeAndOffset(boss, 0.1, 0.1);

            if (!bossCompleted) {
              this.physics.add.overlap(this.player, boss, () => {
                setDisplayText("Boss Time...");

                if (!bossQuestionsLoaded) {
                  setBossQuestionsLoaded(true);
                  setCurrentScene("BossScene");
                } else {
                  setCurrentScene("BossScene");
                }
              });
            } else {
              setCurrentScene("CreditScene");
              setDisplayText("You beat the boss, Well Done");
              const staticBoss = this.physics.add
                .staticImage(2914, 638, "tree")
                .setScale(0.1);
              staticBoss.body.setSize(
                staticBoss.width * 0.1,
                staticBoss.height * 0.1
              );
              staticBoss.body.setOffset(
                (staticBoss.width - staticBoss.width * 0.1) / 2,
                (staticBoss.height - staticBoss.height * 0.1) / 2
              );
              this.physics.add.collider(this.player, staticBoss, () => {});
              staticBoss.setVisible(false);
            }
          });
        } else {
          this.time.delayedCall(3000, () => {
            setDisplayText("");
          });
        }

        this.anims.create({
          key: "walkDown",
          frames: this.anims.generateFrameNumbers("playerDown", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkLeft",
          frames: this.anims.generateFrameNumbers("playerLeft", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkRight",
          frames: this.anims.generateFrameNumbers("playerRight", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkUp",
          frames: this.anims.generateFrameNumbers("playerUp", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkUpLeft",
          frames: this.anims.generateFrameNumbers("playerUpLeft", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkUpRight",
          frames: this.anims.generateFrameNumbers("playerUpRight", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkDownLeft",
          frames: this.anims.generateFrameNumbers("playerDownLeft", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });

        this.anims.create({
          key: "walkDownRight",
          frames: this.anims.generateFrameNumbers("playerDownRight", {
            start: 0,
            end: 2,
          }),
          frameRate: 10,
          repeat: -1,
        });
      },

      update: function () {
        if (!this.player) return;
        this.player.setVelocity(0);

        if (cursors.up.isDown && cursors.left.isDown) {
          this.player.setVelocityX(-250);
          this.player.setVelocityY(-250);
          this.player.anims.play("walkUpLeft", true);
        } else if (cursors.up.isDown && cursors.right.isDown) {
          this.player.setVelocityX(250);
          this.player.setVelocityY(-250);
          this.player.anims.play("walkUpRight", true);
        } else if (cursors.down.isDown && cursors.left.isDown) {
          this.player.setVelocityX(-250);
          this.player.setVelocityY(250);
          this.player.anims.play("walkDownLeft", true);
        } else if (cursors.down.isDown && cursors.right.isDown) {
          this.player.setVelocityX(250);
          this.player.setVelocityY(250);
          this.player.anims.play("walkDownRight", true);
        } else {
          if (cursors.left.isDown) {
            this.player.setVelocityX(-250);
            this.player.anims.play("walkLeft", true);
          } else if (cursors.right.isDown) {
            this.player.setVelocityX(250);
            this.player.anims.play("walkRight", true);
          }

          if (cursors.up.isDown) {
            this.player.setVelocityY(-250);
            this.player.anims.play("walkUp", true);
          } else if (cursors.down.isDown) {
            this.player.setVelocityY(250);
            this.player.anims.play("walkDown", true);
          }
        }

        if (
          cursors.left.isUp &&
          cursors.right.isUp &&
          cursors.up.isUp &&
          cursors.down.isUp
        ) {
          this.player.anims.stop();
        }
      },
    };

    const config = {
      type: Phaser.AUTO,
      width: 890,
      height: 650,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      scene:
        currentScene === "FirstScene" ? (
          FirstScene
        ) : currentScene === "ScienceScene" ? (
          ScienceScene(
            setCurrentScene,
            setScienceCompleted,
            setEnteredScience,
            setDisplayText
          )
        ) : currentScene === "VideoGameScene" ? (
          VideoGameScene(
            setCurrentScene,
            setVideoGameCompleted,
            setEnteredVideoGame
          )
        ) : currentScene === "MusicScene" ? (
          MusicScene(setCurrentScene, setMusicCompleted, setEnteredMusic)
        ) : currentScene === "SportScene" ? (
          SportScene(setCurrentScene, setSportCompleted, setEnteredSport)
        ) : currentScene === "HistoryScene" ? (
          HistoryScene(setCurrentScene, setHistoryCompleted, setEnteredHistory)
        ) : currentScene === "AnimalScene" ? (
          AnimalScene(setCurrentScene, setAnimalCompleted, setEnteredAnimal)
        ) : currentScene === "BossScene" ? (
          BossScene(setCurrentScene, setBossCompleted, setEnteredBoss)
        ) : currentScene === "CreditScene" ? (
          CreditScene(setCurrentScene)
        ) : (
          <h1>error</h1>
        ),
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, [currentScene]);

  return (
    <div
      id="phaser-container"
      style={{ position: "relative" }}
      ref={gameRef}
    ></div>
  );
};

export default PhaserGame;
