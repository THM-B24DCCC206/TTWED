export const duLieuTheMau = [
  { id: 'tag_1', name: 'react', slug: 'react' },
  { id: 'tag_2', name: 'javascript', slug: 'javascript' },
  { id: 'tag_3', name: 'antd', slug: 'antd' },
  { id: 'tag_4', name: 'frontend', slug: 'frontend' },
];

export const thongTinTacGia = {
  name: 'Quang',
  avatar: 'https://i.pravatar.cc/150?img=3',
  bio: 'Sinh viên khoa học dữ liệu, đang học ReactJS và Ant Design.',
  skills: ['ReactJS', 'JavaScript', 'Ant Design', 'HTML', 'CSS'],
  socials: {
    github: 'https://github.com/',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
  },
};

export const duLieuBaiVietMau = [
  {
    id: 'post_1',
    title: 'Học React cơ bản',
    slug: 'hoc-react-co-ban',
    summary: 'Bài viết giới thiệu các khái niệm cơ bản trong React.',
    content: `# React cơ bản

React là thư viện JavaScript để xây dựng giao diện người dùng.

## Một số khái niệm
- Component
- Props
- State
- Event

### Ví dụ
\`\`\`js
function Hello() {
  return <h1>Hello React</h1>;
}
\`\`\`
`,
    thumbnail: 'https://picsum.photos/800/400?random=1',
    tags: ['react', 'javascript'],
    status: 'published',
    author: thongTinTacGia,
    views: 12,
    createdAt: '2026-04-19T10:00:00.000Z',
    publishedAt: '2026-04-19T10:00:00.000Z',
  },
  {
    id: 'post_2',
    title: 'Làm quen với Ant Design',
    slug: 'lam-quen-voi-ant-design',
    summary: 'Bài viết giới thiệu cách sử dụng Ant Design trong dự án React.',
    content: `# Ant Design

Ant Design là bộ thư viện UI rất phổ biến.

## Thành phần hay dùng
- Button
- Form
- Input
- Table
- Modal
`,
    thumbnail: 'https://picsum.photos/800/400?random=2',
    tags: ['antd', 'react', 'frontend'],
    status: 'published',
    author: thongTinTacGia,
    views: 6,
    createdAt: '2026-04-18T08:00:00.000Z',
    publishedAt: '2026-04-18T08:00:00.000Z',
  },
  {
    id: 'post_3',
    title: 'Bài viết nháp về JavaScript',
    slug: 'bai-viet-nhap-ve-javascript',
    summary: 'Đây là một bài viết nháp để test chức năng quản lý bài viết.',
    content: `# JavaScript Draft

Đây là nội dung bài viết nháp.
`,
    thumbnail: 'https://picsum.photos/800/400?random=3',
    tags: ['javascript'],
    status: 'draft',
    author: thongTinTacGia,
    views: 0,
    createdAt: '2026-04-17T09:00:00.000Z',
    publishedAt: null,
  },
];