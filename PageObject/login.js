import { test, expect } from '@playwright/test';
import { config } from '../Common/config';

export async function login(page) {
  
  await page.goto(config.url);
  await page.waitForLoadState('networkidle');
  const start = performance.now();
  

  await page.getByRole('button', { name: 'Accept cookies & sign in' }).click();
  await page.getByPlaceholder('User name').click();
  await page.getByPlaceholder('User name').fill(config.credentials.username);
  await page.getByPlaceholder('User name').press('Tab');
  await page.getByPlaceholder('Password').fill(config.credentials.password);
  await page.getByRole('button', { name: 'Submit' }).click();

  return start;
}