import { expect, test } from '@playwright/test'


test('deve cadastrar um lead na fila de espera', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(
        page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera')

    await page.locator('input[name=name]').fill('Fernando Papito')
    await page.locator('#email').fill('papito@yahoo.com')

    await page.getByTestId('modal')
        .getByText('Quero entrar na fila').click()

    const toastText = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
    await expect(page.locator('.toast')).toHaveText(toastText)
    await expect(page.locator('.toast')).toBeHidden({timeout: 5000})
})

test('Não deve cadastrar com e-mail incorreto', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.getByRole('button', { name: /Aperte o play/ }).click()

    await expect(
        page.getByTestId('modal').getByRole('heading')
    ).toHaveText('Fila de espera')

    await page.locator('input[name=name]').fill('Fernando Papito')
    await page.locator('#email').fill('papito.com')

    await page.getByTestId('modal')
        .getByText('Quero entrar na fila').click()

    

})