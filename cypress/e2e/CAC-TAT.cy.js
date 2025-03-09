

describe('Digitar e enviar formulario', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  
  it('verifica o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  Cypress._.times(5, () => {
  it('preenche os campos obrigatórios e envia o formulário', () => {
    
    cy.clock()
    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Diniz')
    cy.get('#email').type('felipeadiniz@gmail.com')
    cy.get('#open-text-area').type('Mim dê Cypress, pra que eu possa ganhar um salario daora, sair de casa, viajar, pagar minhas contas, e mostrar pra Veronica e pra mim mesmo que eu sou capaz, que consigo viver feliz, provar que ela e os pais estavam errados, e que me abandonar foi um erro', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
    
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })
})

  it ('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Diniz')
    cy.get('#email').type('felipeadiniz2gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })
  it('verifica se telefone não possui valores não numéricos', () => {
    cy.get('#phone').type('abcde!@#$%^&').should('have.value', '')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').type('Felipe')
    cy.get('#lastName').type('Diniz')
    cy.get('#email').type('felipeadiniz@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.get('#phone-checkbox').check().should('be.checked')
    
    cy.contains('button', 'Enviar').click()
    

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Felipe').should('have.value', 'Felipe')
    cy.get('#lastName').type('Diniz').should('have.value', 'Diniz')
    cy.get('#email').type('felipeadiniz@gmail.com').should('have.value', 'felipeadiniz@gmail.com')
    cy.get('#phone').type('981721377').should('have.value', '981721377')
    
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').clear().should('have.value', '')
    
  })
  it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.clock()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado', () => {
    
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()

   
    cy.get('.success').should('be.visible')
    cy.tick(3000)
    cy.get('.success').should('not.be.visible')
  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })
  
  it('seleciona um produto (Blog) por seu índice', () => {
    

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })
  it('marca o tipo de atendimento "Feedback"', () => {
    

    cy.get('[type="radio"]')
      .check('feedback')
      .should('be.checked')

  })
  it('marca cada tipo de atendimento', () => {
    

    cy.get('[type="radio"]').each(typeOfService => {
    cy.wrap(typeOfService)
      .check()
      .should('be.checked')

  }) 
  
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last().uncheck()
      .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    

    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    
    cy.fixture('example.json').as('sampleFile')

    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    

    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
      
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    

    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
      
      
  })
  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })
  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area').invoke('val', 'um texto qualquer')
    .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP', () => {
    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal('OK')
      expect(response.body).to.contains('CAC TAT') 
    })
  })
  it('Encontra o Gato', () => {
    cy.get('#cat').invoke('show')
    .should('be.visible')

    cy.get('#title').invoke('text', 'CAT TAT')
    cy.get('#subtitle').invoke('text', 'Eu <3 gatos')
  })


})
