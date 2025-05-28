import { Injectable } from '@nestjs/common';
import { UserService } from './user/service/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  async getHello(url: string) {
    const isDeployed = !url.includes('localhost') && !url.includes('127.0.0.1');
    const users = await this.userService.findAll();

    return this.renderPage(url, users, isDeployed);
  }

  private renderPage(url: string, users: any[], isDeployed: boolean): string {
    const tableRows = users
      .map(
        (user, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${user.userId}</td>
            <td>${user.email}</td>
          </tr>
        `
      )
      .join('');

    const title = isDeployed ? '배포 환경' : '로컬 테스트';
    const bgColor = isDeployed ? '#90ee90' : 'orange';
    const headline = isDeployed ? '🚀 Deployed!' : '✏️ 로컬 테스트 중입니다';

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              background-color: ${bgColor};
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 2rem;
              font-family: sans-serif;
            }
            h1 {
              font-size: 2rem;
            }
            p {
              margin-bottom: 1rem;
            }
            table {
              border-collapse: collapse;
              width: 60%;
              margin-top: 1rem;
            }
            th, td {
              border: 1px solid #fff;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #333;
              color: white;
            }
            tr:nth-child(even) {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          <h1>${headline}</h1>
          <p>${url}</p>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>아이디</th>
                <th>이메일</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
          <p>유저 추가 API: [POST] ${url}user/signup</p>
          <p>DTO:
            userId: string;
            email: string;
            password: string;
          </p>
        </body>
      </html>
    `;
  }
}
