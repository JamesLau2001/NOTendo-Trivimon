
const CreditScene = (setCurrentScene) => {
    return {
        preload: function () {
            this.load.image("background", "../../public/triviaScenes/credits.jpg");
        },

        create: function () {
            this.add.image(400, 300, "background").setScale(1.7).setOrigin(0.5, 0.5);

            const credits = [
                "Team Notendo",
                "Game Title: Trivimon",
                { role: "Designers", names: ["Israel Grande Fernandez", "Jason La", "James Lau", "Nattal Zemichael"] },
                { role: "Programmers", names: ["Israel Grande Fernandez", "Jason La", "James Lau", "Nattal Zemichael"] },
                { role: "Team Leaders", names: ["Israel Grande Fernandez", "Jason La", "James Lau", "Nattal Zemichael"] },
                "Thank you for playing!",
                "Copyright © Northcoders",
            ];

          
            let yPosition = 50; 
            const creditGroup = this.add.group();
          
            credits.forEach((credit, index) => {
                let creditText;
                if (typeof credit === 'string') {
                    creditText = credit;
                } else {
                    creditText = `${credit.role}: ${credit.names.join(", ")}`;
                }

                const textObject = this.add.text(220, yPosition, creditText, {
                    fontSize: "32px",
                    fill: "#FFF",
                    stroke: "#FFF",
                    backgroundColor: "#000",
                    strokeThickness: 1.5,
                    wordWrap: { width: 500 },
                });

                creditGroup.add(textObject); 
                
                
                if (index === 0) {
                   
                    yPosition += 50; 
                } else if (index === 1) {
                   
                    yPosition += 60; 
                } else {
                    yPosition += 200; 
                }
            });

           
            this.tweens.add({
                targets: creditGroup.getChildren(), 
                y: -yPosition, 
                duration: 20500, 
                ease: "Linear",
                onComplete: () => {
                    setTimeout(() => {
                        setCurrentScene("FirstScene"); 
                    }, 1000); 
                },
            });
        },
    };
};

export default CreditScene;