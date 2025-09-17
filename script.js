// Dinosaur Studio Game Logic
class DinosaurStudio {
    constructor() {
        this.currentDinosaur = 'triceratops';
        this.currentPart = 'body';
        this.currentColor = '#4CAF50';
        this.savedDinosaurs = JSON.parse(localStorage.getItem('savedDinosaurs')) || [];
        this.randomDinosaurs = JSON.parse(localStorage.getItem('randomDinosaurs')) || [];
        this.battleStats = JSON.parse(localStorage.getItem('battleStats')) || {};
        this.selectedFighter1 = null;
        this.selectedFighter2 = null;
        
        this.dinosaurTemplates = {
            triceratops: {
                body: { path: 'M-40 20 Q-45 5 -25 -5 Q-5 -15 25 -10 Q45 -5 50 20 L45 25 Q40 30 0 30 Q-40 30 -45 25 Z', color: '#4CAF50' },
                head: { path: 'M-25 -10 Q-30 -25 -10 -35 Q10 -45 30 -35 Q50 -25 45 -10', color: '#4CAF50' },
                legs: { path: 'M-30 25 L-35 45 M-10 25 L-15 45 M10 25 L5 45 M30 25 L25 45', color: '#4CAF50' },
                tail: { path: 'M45 15 Q60 10 70 20 Q75 30 65 35 Q55 30 50 20', color: '#4CAF50' },
                spikes: { path: 'M-30 -35 L-25 -50 L-20 -35 M-10 -35 L-5 -50 L0 -35 M10 -35 L15 -50 L20 -35 M30 -35 L35 -50 L40 -35', color: '#2E7D32' },
                wings: null
            },
            stegosaurus: {
                body: { path: 'M-50 15 Q-55 0 -35 -10 Q-15 -20 15 -15 Q35 -10 55 0 Q60 15 55 20 L50 25 Q45 30 0 30 Q-45 30 -50 25 Z', color: '#FF9800' },
                head: { path: 'M-50 10 Q-60 0 -55 -10 Q-50 -20 -35 -15 Q-25 -10 -30 0', color: '#FF9800' },
                legs: { path: 'M-40 25 L-45 45 M-20 25 L-25 45 M20 25 L15 45 M40 25 L35 45', color: '#FF9800' },
                tail: { path: 'M55 10 Q70 5 80 15 Q85 25 75 30 Q65 25 60 15', color: '#FF9800' },
                spikes: { path: 'M-40 -10 L-35 -35 L-30 -10 M-20 -15 L-15 -40 L-10 -15 M0 -15 L5 -40 L10 -15 M20 -15 L25 -40 L30 -15 M40 -10 L45 -35 L50 -10', color: '#F57C00' },
                wings: null
            },
            tyrannosaurus: {
                body: { path: 'M-35 10 Q-40 -5 -20 -15 Q0 -25 20 -20 Q40 -15 45 10 L40 15 Q35 20 0 20 Q-35 20 -40 15 Z', color: '#E91E63' },
                head: { path: 'M-20 -15 Q-25 -30 -5 -40 Q15 -50 35 -40 Q55 -30 50 -15', color: '#E91E63' },
                legs: { path: 'M-25 15 L-30 35 M5 15 L0 35', color: '#E91E63' },
                tail: { path: 'M40 5 Q55 0 65 10 Q70 20 60 25 Q50 20 45 10', color: '#E91E63' },
                spikes: { path: 'M-5 -40 L0 -50 L5 -40 M15 -40 L20 -50 L25 -40', color: '#AD1457' },
                wings: null
            },
            brontosaurus: {
                body: { path: 'M-40 20 Q-45 5 -25 -5 Q-5 -15 25 -10 Q45 -5 50 20 L45 25 Q40 30 0 30 Q-40 30 -45 25 Z', color: '#9C27B0' },
                head: { path: 'M-60 -10 Q-70 -20 -60 -30 Q-50 -40 -35 -35 Q-25 -30 -30 -20 Q-35 -10 -45 0', color: '#9C27B0' },
                legs: { path: 'M-30 25 L-35 45 M-10 25 L-15 45 M10 25 L5 45 M30 25 L25 45', color: '#9C27B0' },
                tail: { path: 'M45 15 Q60 10 70 20 Q80 30 75 40 Q65 45 55 35 Q50 25 50 15', color: '#9C27B0' },
                spikes: null,
                wings: null
            },
            velociraptor: {
                body: { path: 'M-30 15 Q-35 0 -15 -10 Q5 -20 25 -15 Q45 -10 50 15 L45 20 Q40 25 0 25 Q-30 25 -35 20 Z', color: '#FF5722' },
                head: { path: 'M-15 -10 Q-20 -25 0 -35 Q20 -45 40 -35 Q60 -25 55 -10', color: '#FF5722' },
                legs: { path: 'M-20 20 L-25 40 M10 20 L5 40', color: '#FF5722' },
                tail: { path: 'M45 10 Q60 5 70 15 Q75 25 65 30 Q55 25 50 15', color: '#FF5722' },
                spikes: { path: 'M-25 40 L-23 45 L-27 45 Z M5 40 L7 45 L3 45 Z', color: '#BF360C' },
                wings: null
            },
            pterodactyl: {
                body: { path: 'M-20 10 Q-25 -5 -5 -15 Q15 -25 35 -15 Q55 -5 50 10 L45 15 Q40 20 0 20 Q-20 20 -25 15 Z', color: '#607D8B' },
                head: { path: 'M-5 -15 Q-10 -30 10 -40 Q30 -50 50 -40 Q70 -30 65 -15', color: '#607D8B' },
                legs: { path: 'M-10 15 L-15 35 M20 15 L15 35', color: '#607D8B' },
                tail: { path: 'M45 5 Q60 0 70 10 Q75 20 65 25 Q55 20 50 10', color: '#607D8B' },
                spikes: null,
                wings: { path: 'M-25 0 Q-45 -15 -60 -5 Q-75 5 -60 15 Q-45 25 -25 10 M50 0 Q70 -15 85 -5 Q100 5 85 15 Q70 25 50 10', color: '#455A64' }
            }
        };

        this.colors = [
            '#4CAF50', '#FF9800', '#E91E63', '#9C27B0', 
            '#FF5722', '#607D8B', '#2196F3', '#FFEB3B',
            '#795548', '#F44336', '#00BCD4', '#8BC34A'
        ];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderDinosaur();
        this.loadSavedDinosaurs();
        this.loadRandomDinosaurs();
        this.loadBattleDinosaurs();
        this.updateLeaderboard();
    }

    setupEventListeners() {

        // Dinosaur selection
        document.querySelectorAll('.dino-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.dino-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentDinosaur = btn.dataset.dino;
                this.renderDinosaur();
                this.updateDinosaurName();
            });
        });

        // Part selection
        document.querySelectorAll('.part-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.part-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentPart = btn.dataset.part;
            });
        });

        // Color selection
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentColor = btn.dataset.color;
                this.updatePartColor();
            });
        });

        // Custom color picker
        document.getElementById('custom-color').addEventListener('change', (e) => {
            this.currentColor = e.target.value;
            this.updatePartColor();
        });

        // Magic Random Button
        document.getElementById('magic-random-btn').addEventListener('click', () => this.createMagicDinosaur());
        
        // Action buttons
        document.querySelector('.reset-btn').addEventListener('click', () => this.resetDinosaur());
        document.querySelector('.save-btn').addEventListener('click', () => this.saveDinosaur());
        document.querySelector('.share-btn').addEventListener('click', () => this.shareDinosaur());

        // Tab navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabName = btn.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Battle system
        document.getElementById('battle-btn').addEventListener('click', () => this.startBattle());


        // Drag and drop for dinosaur parts
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        const canvas = document.getElementById('dinosaur-canvas');
        let isDragging = false;
        let draggedElement = null;
        let startPos = { x: 0, y: 0 };

        canvas.addEventListener('mousedown', (e) => {
            const target = e.target.closest('[data-part]');
            if (target) {
                isDragging = true;
                draggedElement = target;
                const rect = canvas.getBoundingClientRect();
                startPos.x = e.clientX - rect.left;
                startPos.y = e.clientY - rect.top;
                target.classList.add('dragging');
                canvas.style.cursor = 'grabbing';
            }
        });

        canvas.addEventListener('mousemove', (e) => {
            if (isDragging && draggedElement) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left - startPos.x;
                const y = e.clientY - rect.top - startPos.y;
                
                const currentTransform = draggedElement.getAttribute('transform') || '';
                const newTransform = `translate(${x}, ${y})`;
                draggedElement.setAttribute('transform', newTransform);
            }
        });

        canvas.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                if (draggedElement) {
                    draggedElement.classList.remove('dragging');
                    draggedElement = null;
                }
                canvas.style.cursor = 'grab';
            }
        });

        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });

        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup', {});
            canvas.dispatchEvent(mouseEvent);
        });
    }

    renderDinosaur() {
        const dinoGroup = document.getElementById('dinosaur-group');
        const template = this.dinosaurTemplates[this.currentDinosaur];
        
        // Clear existing dinosaur
        dinoGroup.innerHTML = '';

        // Render each part
        Object.keys(template).forEach(partName => {
            const part = template[partName];
            if (part && part.path) {
                const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                pathElement.setAttribute('d', part.path);
                pathElement.setAttribute('fill', part.color);
                pathElement.setAttribute('stroke', '#333');
                pathElement.setAttribute('stroke-width', '1');
                pathElement.setAttribute('data-part', partName);
                pathElement.style.cursor = 'grab';
                
                // Add hover effects
                pathElement.addEventListener('mouseenter', () => {
                    pathElement.setAttribute('stroke-width', '2');
                    pathElement.style.filter = 'brightness(1.1)';
                });
                
                pathElement.addEventListener('mouseleave', () => {
                    pathElement.setAttribute('stroke-width', '1');
                    pathElement.style.filter = 'none';
                });

                dinoGroup.appendChild(pathElement);
            }
        });

        // Add eyes
        this.addEyes(dinoGroup);
    }

    addEyes(dinoGroup) {
        const eyePositions = {
            triceratops: [{ x: -15, y: -25 }, { x: 15, y: -25 }],
            stegosaurus: [{ x: -45, y: -5 }],
            tyrannosaurus: [{ x: -5, y: -35 }, { x: 25, y: -35 }],
            brontosaurus: [{ x: -45, y: -25 }],
            velociraptor: [{ x: 5, y: -30 }, { x: 35, y: -30 }],
            pterodactyl: [{ x: 15, y: -35 }, { x: 45, y: -35 }]
        };

        const eyes = eyePositions[this.currentDinosaur] || [];
        eyes.forEach(pos => {
            const eye = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            eye.setAttribute('cx', pos.x);
            eye.setAttribute('cy', pos.y);
            eye.setAttribute('r', '3');
            eye.setAttribute('fill', '#333');
            eye.setAttribute('data-part', 'eyes');
            dinoGroup.appendChild(eye);
        });
    }

    updatePartColor() {
        const dinoGroup = document.getElementById('dinosaur-group');
        const partElements = dinoGroup.querySelectorAll(`[data-part="${this.currentPart}"]`);
        
        partElements.forEach(element => {
            element.setAttribute('fill', this.currentColor);
            element.classList.add('pulse');
            setTimeout(() => element.classList.remove('pulse'), 600);
        });

        // Update template
        if (this.dinosaurTemplates[this.currentDinosaur][this.currentPart]) {
            this.dinosaurTemplates[this.currentDinosaur][this.currentPart].color = this.currentColor;
        }
    }

    createMagicDinosaur() {
        // Play sound effect
        this.playMagicSound();
        
        // Create fireworks
        this.createFireworks();
        
        // Random dinosaur type
        const dinoTypes = Object.keys(this.dinosaurTemplates);
        this.currentDinosaur = dinoTypes[Math.floor(Math.random() * dinoTypes.length)];
        
        // Update UI
        document.querySelectorAll('.dino-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.dino === this.currentDinosaur);
        });

        // Random colors for each part
        const template = this.dinosaurTemplates[this.currentDinosaur];
        Object.keys(template).forEach(partName => {
            if (template[partName]) {
                const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
                template[partName].color = randomColor;
            }
        });

        this.renderDinosaur();
        this.updateDinosaurName();
        
        // Add magic animation to button
        const magicBtn = document.getElementById('magic-random-btn');
        magicBtn.style.animation = 'pulse 0.6s ease-in-out';
        setTimeout(() => {
            magicBtn.style.animation = '';
        }, 600);
        
        // Add canvas animation
        const canvas = document.getElementById('dinosaur-canvas');
        canvas.style.animation = 'bounceIn 0.8s ease-out';
        setTimeout(() => {
            canvas.style.animation = '';
        }, 800);
        
        // Auto-save to dinosaur wall
        setTimeout(() => {
            this.saveToWall();
        }, 1000);
    }

    playMagicSound() {
        // Create audio context for sound effects
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Create a magical sound effect
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Magic sound: ascending notes
            oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.2);
            oscillator.frequency.exponentialRampToValueAtTime(660, audioContext.currentTime + 0.4);
            oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.6);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
            
            oscillator.type = 'sine';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.8);
        } catch (error) {
            console.log('Audio not supported, but that\'s okay!');
        }
    }

    createFireworks() {
        const fireworkEmojis = ['🎆', '🎇', '✨', '🌟', '⭐', '💫', '🎉', '🎊'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const firework = document.createElement('div');
                firework.className = 'firework';
                firework.textContent = fireworkEmojis[Math.floor(Math.random() * fireworkEmojis.length)];
                
                // Random position
                firework.style.left = Math.random() * window.innerWidth + 'px';
                firework.style.top = Math.random() * window.innerHeight + 'px';
                
                document.body.appendChild(firework);
                
                // Remove after animation
                setTimeout(() => {
                    if (firework.parentNode) {
                        firework.parentNode.removeChild(firework);
                    }
                }, 2000);
            }, i * 100);
        }
    }

    saveToWall() {
        const dinoData = {
            id: Date.now(),
            type: this.currentDinosaur,
            name: `Magic ${this.currentDinosaur.charAt(0).toUpperCase() + this.currentDinosaur.slice(1)}`,
            template: JSON.parse(JSON.stringify(this.dinosaurTemplates[this.currentDinosaur])),
            timestamp: new Date().toISOString(),
            isRandom: true
        };

        this.randomDinosaurs.unshift(dinoData); // Add to beginning
        
        // Keep only last 20 random dinosaurs
        if (this.randomDinosaurs.length > 20) {
            this.randomDinosaurs = this.randomDinosaurs.slice(0, 20);
        }
        
        localStorage.setItem('randomDinosaurs', JSON.stringify(this.randomDinosaurs));
        this.loadRandomDinosaurs();
        
        this.showNotification('🎉 Magic dinosaur added to the Wall of Fame!', 'success');
    }

    resetDinosaur() {
        // Reset to original colors
        const originalTemplates = {
            triceratops: { body: '#4CAF50', head: '#4CAF50', legs: '#4CAF50', tail: '#4CAF50', spikes: '#2E7D32' },
            stegosaurus: { body: '#FF9800', head: '#FF9800', legs: '#FF9800', tail: '#FF9800', spikes: '#F57C00' },
            tyrannosaurus: { body: '#E91E63', head: '#E91E63', legs: '#E91E63', tail: '#E91E63', spikes: '#AD1457' },
            brontosaurus: { body: '#9C27B0', head: '#9C27B0', legs: '#9C27B0', tail: '#9C27B0' },
            velociraptor: { body: '#FF5722', head: '#FF5722', legs: '#FF5722', tail: '#FF5722', spikes: '#BF360C' },
            pterodactyl: { body: '#607D8B', head: '#607D8B', legs: '#607D8B', tail: '#607D8B', wings: '#455A64' }
        };

        const template = this.dinosaurTemplates[this.currentDinosaur];
        const originalColors = originalTemplates[this.currentDinosaur];
        
        Object.keys(template).forEach(partName => {
            if (template[partName] && originalColors[partName]) {
                template[partName].color = originalColors[partName];
            }
        });

        this.renderDinosaur();
    }

    saveDinosaur() {
        const dinoData = {
            id: Date.now(),
            type: this.currentDinosaur,
            name: `${this.currentDinosaur.charAt(0).toUpperCase() + this.currentDinosaur.slice(1)} #${this.savedDinosaurs.length + 1}`,
            template: JSON.parse(JSON.stringify(this.dinosaurTemplates[this.currentDinosaur])),
            timestamp: new Date().toISOString()
        };

        this.savedDinosaurs.push(dinoData);
        localStorage.setItem('savedDinosaurs', JSON.stringify(this.savedDinosaurs));
        
        this.loadSavedDinosaurs();
        this.showNotification('Dinosaur saved successfully! 🦕', 'success');
    }

    loadRandomDinosaurs() {
        const wall = document.getElementById('dinosaur-wall');
        wall.innerHTML = '';

        if (this.randomDinosaurs.length === 0) {
            wall.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1; padding: 40px;">No magic dinosaurs yet! Click the magic button to create your first random dinosaur! ✨</p>';
            return;
        }

        this.randomDinosaurs.forEach((dino, index) => {
            const dinoElement = document.createElement('div');
            dinoElement.className = 'wall-dino';
            dinoElement.style.animationDelay = `${index * 0.1}s`;
            dinoElement.innerHTML = `
                <svg viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#87CEEB"/>
                    <ellipse cx="200" cy="280" rx="200" ry="20" fill="#8BC34A" opacity="0.7"/>
                    <g transform="translate(200,150)">
                        ${this.generateDinosaurSVG(dino.template)}
                    </g>
                </svg>
                <h4>${dino.name}</h4>
                <div class="creation-time">${this.formatTime(dino.timestamp)}</div>
            `;
            
            dinoElement.addEventListener('click', () => {
                this.loadDinosaur(dino);
            });

            wall.appendChild(dinoElement);
        });
    }

    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        return `${Math.floor(diff / 86400000)}d ago`;
    }

    loadSavedDinosaurs() {
        const gallery = document.getElementById('saved-dinosaurs');
        gallery.innerHTML = '';

        if (this.savedDinosaurs.length === 0) {
            gallery.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1;">No saved dinosaurs yet. Create and save your first dinosaur!</p>';
            return;
        }

        this.savedDinosaurs.forEach(dino => {
            const dinoElement = document.createElement('div');
            dinoElement.className = 'saved-dino';
            dinoElement.innerHTML = `
                <svg viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#87CEEB"/>
                    <ellipse cx="200" cy="280" rx="200" ry="20" fill="#8BC34A" opacity="0.7"/>
                    <g transform="translate(200,150)">
                        ${this.generateDinosaurSVG(dino.template)}
                    </g>
                </svg>
                <h4>${dino.name}</h4>
            `;
            
            dinoElement.addEventListener('click', () => {
                this.loadDinosaur(dino);
            });

            gallery.appendChild(dinoElement);
        });
    }

    generateDinosaurSVG(template) {
        let svg = '';
        Object.keys(template).forEach(partName => {
            const part = template[partName];
            if (part && part.path) {
                svg += `<path d="${part.path}" fill="${part.color}" stroke="#333" stroke-width="1"/>`;
            }
        });
        
        // Add eyes
        const eyePositions = {
            triceratops: [{ x: -15, y: -25 }, { x: 15, y: -25 }],
            stegosaurus: [{ x: -45, y: -5 }],
            tyrannosaurus: [{ x: -5, y: -35 }, { x: 25, y: -35 }],
            brontosaurus: [{ x: -45, y: -25 }],
            velociraptor: [{ x: 5, y: -30 }, { x: 35, y: -30 }],
            pterodactyl: [{ x: 15, y: -35 }, { x: 45, y: -35 }]
        };

        const dinoType = Object.keys(this.dinosaurTemplates).find(type => 
            JSON.stringify(this.dinosaurTemplates[type].body?.path) === JSON.stringify(template.body?.path)
        ) || 'triceratops';

        const eyes = eyePositions[dinoType] || [];
        eyes.forEach(pos => {
            svg += `<circle cx="${pos.x}" cy="${pos.y}" r="3" fill="#333"/>`;
        });

        return svg;
    }

    loadDinosaur(dinoData) {
        this.currentDinosaur = dinoData.type;
        this.dinosaurTemplates[this.currentDinosaur] = JSON.parse(JSON.stringify(dinoData.template));
        
        // Update UI
        document.querySelectorAll('.dino-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.dino === this.currentDinosaur);
        });
        
        this.renderDinosaur();
        this.updateDinosaurName();
        this.showNotification(`Loaded ${dinoData.name}! 🎨`, 'info');
    }

    shareDinosaur() {
        const canvas = document.getElementById('dinosaur-canvas');
        const svgData = new XMLSerializer().serializeToString(canvas);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        // Create download link
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${this.currentDinosaur}-${Date.now()}.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        URL.revokeObjectURL(svgUrl);
        this.showNotification('Dinosaur exported as SVG! 📁', 'success');
    }

    updateDinosaurName() {
        const nameElement = document.getElementById('dino-name');
        nameElement.textContent = this.currentDinosaur.charAt(0).toUpperCase() + this.currentDinosaur.slice(1);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Style notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
            font-weight: 600;
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 4000);
    }

    // Tab System
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.toggle('active', content.id === `${tabName}-tab`);
        });

        // Load battle dinosaurs when switching to fighting tab
        if (tabName === 'fighting') {
            this.loadBattleDinosaurs();
            this.updateLeaderboard();
        }
    }

    // Battle System
    loadBattleDinosaurs() {
        const grid = document.getElementById('battle-dinosaur-grid');
        grid.innerHTML = '';

        // Combine all dinosaurs (saved + random)
        const allDinosaurs = [...this.savedDinosaurs, ...this.randomDinosaurs];

        if (allDinosaurs.length === 0) {
            grid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1/-1; padding: 40px;">No dinosaurs available for battle! Create some dinosaurs first! 🦕</p>';
            return;
        }

        allDinosaurs.forEach(dino => {
            const stats = this.getBattleStats(dino.id);
            const dinoCard = document.createElement('div');
            dinoCard.className = 'battle-dino-card';
            dinoCard.dataset.dinoId = dino.id;
            dinoCard.innerHTML = `
                <svg viewBox="0 0 400 300">
                    <rect width="400" height="300" fill="#87CEEB"/>
                    <g transform="translate(200,150)">
                        ${this.generateDinosaurSVG(dino.template)}
                    </g>
                </svg>
                <h4>${dino.name}</h4>
                <div class="dino-score">Score: ${stats.score}</div>
            `;

            dinoCard.addEventListener('click', () => {
                this.selectFighter(dino, dinoCard);
            });

            grid.appendChild(dinoCard);
        });
    }

    selectFighter(dino, cardElement) {
        if (!this.selectedFighter1) {
            this.selectedFighter1 = dino;
            cardElement.classList.add('selected');
            this.updateFighterDisplay(1, dino);
        } else if (!this.selectedFighter2 && dino.id !== this.selectedFighter1.id) {
            this.selectedFighter2 = dino;
            cardElement.classList.add('selected');
            this.updateFighterDisplay(2, dino);
        } else {
            // Reset selection
            document.querySelectorAll('.battle-dino-card').forEach(card => {
                card.classList.remove('selected');
            });
            this.selectedFighter1 = dino;
            this.selectedFighter2 = null;
            cardElement.classList.add('selected');
            this.updateFighterDisplay(1, dino);
            this.clearFighterDisplay(2);
        }

        this.updateBattleButton();
    }

    updateFighterDisplay(fighterNum, dino) {
        const display = document.getElementById(`fighter${fighterNum}-display`);
        const stats = this.getBattleStats(dino.id);
        
        display.innerHTML = `
            <svg viewBox="0 0 400 300" style="width: 100%; height: 100%;">
                <rect width="400" height="300" fill="#87CEEB"/>
                <g transform="translate(200,150)">
                    ${this.generateDinosaurSVG(dino.template)}
                </g>
            </svg>
        `;
        display.classList.add('selected');

        const statsContainer = document.getElementById(`fighter${fighterNum}-stats`);
        statsContainer.innerHTML = `
            <div class="stat-item">💪 ATK: ${stats.attack}</div>
            <div class="stat-item">🛡️ DEF: ${stats.defense}</div>
            <div class="stat-item">⚡ SPD: ${stats.speed}</div>
            <div class="stat-item">🏆 Score: ${stats.score}</div>
        `;
    }

    clearFighterDisplay(fighterNum) {
        const display = document.getElementById(`fighter${fighterNum}-display`);
        display.innerHTML = `
            <div class="empty-slot">
                <span class="slot-icon">${fighterNum === 1 ? '🦕' : '🦖'}</span>
                <p>Select a dinosaur</p>
            </div>
        `;
        display.classList.remove('selected');

        const statsContainer = document.getElementById(`fighter${fighterNum}-stats`);
        statsContainer.innerHTML = '';
    }

    updateBattleButton() {
        const battleBtn = document.getElementById('battle-btn');
        battleBtn.disabled = !this.selectedFighter1 || !this.selectedFighter2;
    }

    getBattleStats(dinoId) {
        if (!this.battleStats[dinoId]) {
            // Generate random stats for new dinosaurs
            this.battleStats[dinoId] = {
                attack: Math.floor(Math.random() * 50) + 50,
                defense: Math.floor(Math.random() * 50) + 50,
                speed: Math.floor(Math.random() * 50) + 50,
                wins: 0,
                losses: 0,
                score: 1000
            };
            localStorage.setItem('battleStats', JSON.stringify(this.battleStats));
        }
        return this.battleStats[dinoId];
    }

    startBattle() {
        if (!this.selectedFighter1 || !this.selectedFighter2) return;

        // Play battle sound
        this.playBattleSound();

        // Show battle animation
        this.animateBattle();

        // Calculate battle result
        setTimeout(() => {
            const result = this.calculateBattleResult();
            this.showBattleResult(result);
            this.updateBattleStats(result);
            this.updateLeaderboard();
        }, 3000);
    }

    playBattleSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Battle drum sound
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(80, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(60, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.type = 'sawtooth';
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio not supported');
        }
    }

    animateBattle() {
        const fighter1Display = document.getElementById('fighter1-display');
        const fighter2Display = document.getElementById('fighter2-display');
        const battleBtn = document.getElementById('battle-btn');

        battleBtn.textContent = 'BATTLING...';
        battleBtn.disabled = true;

        // Shake animation
        let shakeCount = 0;
        const shakeInterval = setInterval(() => {
            fighter1Display.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            fighter2Display.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            
            shakeCount++;
            if (shakeCount > 30) {
                clearInterval(shakeInterval);
                fighter1Display.style.transform = '';
                fighter2Display.style.transform = '';
            }
        }, 100);

        // Create battle effects
        this.createBattleEffects();
    }

    createBattleEffects() {
        const battleEmojis = ['💥', '⚡', '🔥', '💫', '⭐', '✨'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const effect = document.createElement('div');
                effect.className = 'firework';
                effect.textContent = battleEmojis[Math.floor(Math.random() * battleEmojis.length)];
                effect.style.left = (window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4) + 'px';
                effect.style.top = (window.innerHeight * 0.3 + Math.random() * window.innerHeight * 0.4) + 'px';
                
                document.body.appendChild(effect);
                
                setTimeout(() => {
                    if (effect.parentNode) {
                        effect.parentNode.removeChild(effect);
                    }
                }, 2000);
            }, i * 150);
        }
    }

    calculateBattleResult() {
        const stats1 = this.getBattleStats(this.selectedFighter1.id);
        const stats2 = this.getBattleStats(this.selectedFighter2.id);

        // Calculate battle scores with some randomness
        const score1 = stats1.attack + stats1.defense + stats1.speed + Math.random() * 100;
        const score2 = stats2.attack + stats2.defense + stats2.speed + Math.random() * 100;

        const winner = score1 > score2 ? this.selectedFighter1 : this.selectedFighter2;
        const loser = score1 > score2 ? this.selectedFighter2 : this.selectedFighter1;

        return {
            winner,
            loser,
            winnerScore: Math.max(score1, score2),
            loserScore: Math.min(score1, score2),
            margin: Math.abs(score1 - score2)
        };
    }

    showBattleResult(result) {
        const resultDiv = document.getElementById('battle-result');
        const announcement = document.getElementById('winner-announcement');
        const badge = document.getElementById('winner-badge');
        const details = document.getElementById('battle-details');

        announcement.textContent = `🏆 ${result.winner.name} Wins!`;
        
        // Award badge based on margin
        let badgeText = '';
        if (result.margin > 80) {
            badgeText = '🥇 Legendary Victory!';
        } else if (result.margin > 50) {
            badgeText = '🥈 Decisive Win!';
        } else if (result.margin > 20) {
            badgeText = '🥉 Close Victory!';
        } else {
            badgeText = '🏅 Narrow Win!';
        }
        
        badge.textContent = badgeText;
        
        details.innerHTML = `
            <p><strong>${result.winner.name}</strong> defeated <strong>${result.loser.name}</strong></p>
            <p>Final Score: ${Math.round(result.winnerScore)} vs ${Math.round(result.loserScore)}</p>
            <p>Victory Margin: ${Math.round(result.margin)} points</p>
        `;

        resultDiv.style.display = 'block';

        // Reset battle button
        const battleBtn = document.getElementById('battle-btn');
        battleBtn.innerHTML = '<span class="battle-icon">⚔️</span><span class="battle-text">BATTLE!</span>';
        battleBtn.disabled = false;

        // Create victory fireworks
        setTimeout(() => {
            this.createFireworks();
        }, 500);
    }

    updateBattleStats(result) {
        const winnerStats = this.getBattleStats(result.winner.id);
        const loserStats = this.getBattleStats(result.loser.id);

        // Update wins/losses
        winnerStats.wins++;
        loserStats.losses++;

        // Update scores (ELO-like system)
        const scoreDiff = Math.round(result.margin / 10);
        winnerStats.score += 50 + scoreDiff;
        loserStats.score = Math.max(500, loserStats.score - 30 + scoreDiff);

        // Small stat improvements for winner
        if (Math.random() < 0.3) {
            const statToImprove = ['attack', 'defense', 'speed'][Math.floor(Math.random() * 3)];
            winnerStats[statToImprove] = Math.min(100, winnerStats[statToImprove] + 1);
        }

        localStorage.setItem('battleStats', JSON.stringify(this.battleStats));
    }

    updateLeaderboard() {
        const leaderboard = document.getElementById('leaderboard-list');
        
        // Get all dinosaurs with battle stats
        const allDinosaurs = [...this.savedDinosaurs, ...this.randomDinosaurs];
        const battleDinosaurs = allDinosaurs
            .filter(dino => this.battleStats[dino.id])
            .map(dino => ({
                ...dino,
                stats: this.battleStats[dino.id]
            }))
            .sort((a, b) => b.stats.score - a.stats.score);

        leaderboard.innerHTML = '';

        if (battleDinosaurs.length === 0) {
            leaderboard.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No battles yet! Start fighting to see the leaderboard! ⚔️</p>';
            return;
        }

        battleDinosaurs.slice(0, 10).forEach((dino, index) => {
            const item = document.createElement('div');
            item.className = 'leaderboard-item';
            
            const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-other';
            
            item.innerHTML = `
                <div class="rank-badge ${rankClass}">${index + 1}</div>
                <div class="leaderboard-dino">
                    <svg viewBox="0 0 400 300">
                        <rect width="400" height="300" fill="#87CEEB"/>
                        <g transform="translate(200,150)">
                            ${this.generateDinosaurSVG(dino.template)}
                        </g>
                    </svg>
                    <div class="leaderboard-name">${dino.name}</div>
                </div>
                <div class="leaderboard-wins">${dino.stats.wins}W-${dino.stats.losses}L</div>
                <div class="leaderboard-score">${dino.stats.score}</div>
            `;
            
            leaderboard.appendChild(item);
        });
    }

}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DinosaurStudio();
});

// Add some fun keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        const magicBtn = document.getElementById('magic-random-btn');
        if (magicBtn) magicBtn.click();
    }
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('.save-btn').click();
    }
});
