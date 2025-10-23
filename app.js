class NotificationApp {
    constructor() {
        this.isMonitoring = false;
        this.botToken = '';
        this.chatId = '';
        this.loadSettings();
    }

    loadSettings() {
        this.botToken = localStorage.getItem('botToken') || '';
        this.chatId = localStorage.getItem('chatId') || '';
        
        document.getElementById('botToken').value = this.botToken;
        document.getElementById('chatId').value = this.chatId;
    }

    saveSettings() {
        this.botToken = document.getElementById('botToken').value;
        this.chatId = document.getElementById('chatId').value;
        
        localStorage.setItem('botToken', this.botToken);
        localStorage.setItem('chatId', this.chatId);
        
        this.updateStatus('Settings saved!');
    }

    async startMonitoring() {
        if (!this.botToken || !this.chatId) {
            this.updateStatus('Please enter Bot Token and Chat ID first');
            return;
        }

        // Request notification permission
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                this.isMonitoring = true;
                this.updateStatus('Monitoring started!');
                
                // Send test message
                await this.sendToTelegram('🔔 Notification monitoring started!');
                
                // Simulate notification detection (you'll need to extend this)
                this.setupNotificationListener();
            }
        }
    }

    stopMonitoring() {
        this.isMonitoring = false;
        this.updateStatus('Monitoring stopped');
    }

    updateStatus(message) {
        document.getElementById('status').textContent = message;
    }

    async sendToTelegram(message) {
        if (!this.botToken || !this.chatId) return;

        const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message
                })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Telegram error:', error);
        }
    }

    setupNotificationListener() {
        // This is where you'd integrate with notification listening services
        // For now, we'll simulate with a button
        document.addEventListener('click', () => {
            if (this.isMonitoring) {
                this.sendToTelegram('📱 App interaction detected');
            }
        });
    }
}

// Initialize app
const app = new NotificationApp();

// Global functions for buttons
function startMonitoring() {
    app.startMonitoring();
}

function stopMonitoring() {
    app.stopMonitoring();
}

function saveSettings() {
    app.saveSettings();
}