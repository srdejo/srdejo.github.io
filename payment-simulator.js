class PaymentSimulator {
  constructor() {
    this.isRunning = false;
    this.timeline = [];
    this.startTime = 0;
  }

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timeline = [];
    this.startTime = Date.now();

    const startBtn = document.querySelector('button');
    startBtn.disabled = true;

    try {
      // 1. Client sends request
      await this.animateNode('node-1', 'processing', 300);
      this.addTimeline('0ms', 'Cliente inicia solicitud');

      // 2. API Gateway receives
      await this.delay(200);
      await this.animateConnector('connector-line', 0, 'active', 400);
      await this.animateNode('node-2', 'processing', 300);
      this.addTimeline('200ms', 'API Gateway recibe request');

      // 3. Payment Service processes
      await this.delay(200);
      await this.animateConnector('connector-line', 1, 'active', 400);
      await this.animateNode('node-3', 'processing', 500);
      this.addTimeline('400ms', 'Payment Service procesa');

      // 4. External Provider call
      await this.delay(300);
      await this.animateConnector('connector-line', 2, 'active', 800);
      await this.animateNode('node-4', 'processing', 800);
      this.addTimeline('700ms', 'Solicitud enviada a Proveedor');

      // 5. Provider response
      await this.delay(800);
      await this.animateConnector('connector-line', 3, 'active', 600);
      await this.animateNode('node-4', 'success', 300);
      this.addTimeline('1500ms', 'Respuesta del Proveedor recibida');

      // 6. Database persistence
      await this.delay(200);
      await this.animateConnector('connector-line', 4, 'active', 400);
      await this.animateNode('node-5', 'processing', 300);
      this.addTimeline('1700ms', 'Persistencia en Base de Datos');

      await this.delay(300);
      await this.animateNode('node-5', 'success', 300);
      this.addTimeline('2000ms', 'Datos persistidos exitosamente');

      // 7. Publish event to queue
      await this.delay(200);
      await this.animateNode('node-6', 'processing', 300);
      this.addTimeline('2200ms', 'Evento publicado a Message Queue');

      // 8. Async processing - Audit Service
      await this.delay(300);
      await this.animateConnector('connector-line', 5, 'active', 400);
      await this.animateNode('node-7', 'processing', 400);
      this.addTimeline('2500ms', 'Audit Service procesa evento');

      await this.delay(400);
      await this.animateNode('node-7', 'success', 300);
      this.addTimeline('2900ms', 'Auditoría completada');

      // 9. Async processing - Notification Service
      await this.delay(200);
      await this.animateConnector('connector-line', 6, 'active', 400);
      await this.animateNode('node-8', 'processing', 400);
      this.addTimeline('3100ms', 'Notification Service procesa');

      await this.delay(400);
      await this.animateNode('node-8', 'success', 300);
      this.addTimeline('3500ms', 'Notificación enviada');

      // Final state
      await this.delay(300);
      await this.animateNode('node-1', 'success', 300);
      await this.animateNode('node-3', 'success', 300);
      this.addTimeline('3800ms', 'Simulación completada');

      this.isRunning = false;
      startBtn.disabled = false;
    } catch (error) {
      console.error('Error en simulación:', error);
      this.isRunning = false;
      startBtn.disabled = false;
    }
  }

  simulateFailure() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.timeline = [];
    this.startTime = Date.now();

    const startBtn = document.querySelectorAll('button')[0];
    startBtn.disabled = true;

    setTimeout(async () => {
      try {
        // Same as normal until provider
        await this.animateNode('node-1', 'processing', 300);
        this.addTimeline('0ms', 'Cliente inicia solicitud');

        await this.delay(200);
        await this.animateNode('node-2', 'processing', 300);
        this.addTimeline('200ms', 'API Gateway recibe request');

        await this.delay(200);
        await this.animateNode('node-3', 'processing', 500);
        this.addTimeline('400ms', 'Payment Service procesa');

        await this.delay(300);
        await this.animateNode('node-4', 'processing', 800);
        this.addTimeline('700ms', 'Solicitud enviada a Proveedor');

        // Provider fails
        await this.delay(800);
        await this.animateNode('node-4', 'error', 300);
        this.addTimeline('1500ms', '❌ Proveedor retorna error');

        // Retry
        await this.delay(500);
        await this.animateNode('node-4', 'processing', 600);
        this.addTimeline('2000ms', '🔄 Reintentando...');

        await this.delay(600);
        await this.animateNode('node-4', 'success', 300);
        this.addTimeline('2600ms', '✓ Proveedor responde exitosamente');

        // Continue normal flow
        await this.delay(200);
        await this.animateNode('node-5', 'processing', 300);
        this.addTimeline('2800ms', 'Persistencia en Base de Datos');

        await this.delay(300);
        await this.animateNode('node-5', 'success', 300);
        this.addTimeline('3100ms', 'Datos persistidos');

        await this.delay(200);
        await this.animateNode('node-6', 'processing', 300);
        this.addTimeline('3300ms', 'Evento publicado');

        await this.delay(300);
        await this.animateNode('node-7', 'processing', 400);
        this.addTimeline('3600ms', 'Audit Service procesa');

        await this.delay(400);
        await this.animateNode('node-7', 'success', 300);
        this.addTimeline('4000ms', 'Auditoría completada');

        await this.delay(200);
        await this.animateNode('node-8', 'processing', 400);
        this.addTimeline('4200ms', 'Notification Service procesa');

        await this.delay(400);
        await this.animateNode('node-8', 'success', 300);
        this.addTimeline('4600ms', 'Notificación enviada');

        await this.delay(300);
        await this.animateNode('node-1', 'success', 300);
        await this.animateNode('node-3', 'success', 300);
        this.addTimeline('4900ms', 'Simulación completada con recuperación');

        this.isRunning = false;
        startBtn.disabled = false;
      } catch (error) {
        console.error('Error:', error);
        this.isRunning = false;
        startBtn.disabled = false;
      }
    }, 100);
  }

  reset() {
    this.isRunning = false;
    this.timeline = [];
    
    // Reset all nodes
    document.querySelectorAll('[id^="node-"]').forEach(node => {
      const rect = node.querySelector('rect');
      if (rect) {
        rect.classList.remove('active', 'processing', 'success', 'error');
        rect.classList.add('sync', 'external', 'async', 'data');
      }
    });

    // Reset connectors
    document.querySelectorAll('.connector-line').forEach(line => {
      line.classList.remove('active');
    });

    // Clear timeline
    const timelineContainer = document.getElementById('timeline-container');
    if (timelineContainer) {
      timelineContainer.innerHTML = '';
    }

    // Enable buttons
    document.querySelectorAll('button').forEach(btn => {
      btn.disabled = false;
    });
  }

  animateNode(nodeId, state, duration) {
    return new Promise(resolve => {
      const node = document.getElementById(nodeId);
      if (!node) {
        resolve();
        return;
      }

      const rect = node.querySelector('rect');
      if (rect) {
        rect.classList.remove('processing', 'success', 'error');
        rect.classList.add(state);
      }

      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

  animateConnector(className, index, state, duration) {
    return new Promise(resolve => {
      const connectors = document.querySelectorAll(`.${className}`);
      if (connectors[index]) {
        connectors[index].classList.add(state);
      }

      setTimeout(() => {
        if (connectors[index]) {
          connectors[index].classList.remove(state);
        }
        resolve();
      }, duration);
    });
  }

  addTimeline(time, event) {
    this.timeline.push({ time, event });
    const container = document.getElementById('timeline-container');
    if (container) {
      const item = document.createElement('div');
      item.className = 'timeline-item active';
      item.innerHTML = `<span class="timeline-time">${time}</span><span class="timeline-text">${event}</span>`;
      container.appendChild(item);
      container.scrollTop = container.scrollHeight;
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Initialize simulator
const simulator = new PaymentSimulator();
