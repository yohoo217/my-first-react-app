  /*booking_flow.spec.js*/
<reference types="cypress" />
describe('Booking Flow', () => {
    it('allows a user to book a course', () => {
      // 訪問您的應用
      cy.visit('http://localhost:3000')
  
      // 檢查頁面是否包含特定文本
      cy.contains('課程介紹與預約').should('be.visible')
  
      // 點擊第一個 "預約此課程" 按鈕
      cy.contains('預約此課程').first().click()
  
      // 填寫表單
      cy.get('input[name="name"]').type('測試用戶')
      cy.get('input[name="email"]').type('test@example.com')
      cy.get('input[type="date"]').type('2023-08-15')
      cy.get('input[type="time"]').type('14:00')
  
      // 提交表單
      cy.contains('提交預約').click()
  
      // 檢查是否顯示成功消息
      cy.contains('預約成功').should('be.visible')
    })
  })