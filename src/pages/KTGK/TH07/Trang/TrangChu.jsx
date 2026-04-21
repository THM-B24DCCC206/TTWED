import React, { useState, useCallback, useMemo } from 'react';
import { Input, List, Row, Col, Typography } from 'antd';
import debounce from 'lodash/debounce';
import { TheBaiViet } from '../ThanhPhan/components';

const { Search } = Input;
const { Title } = Typography;

// Mock Data
const MOCK_POSTS = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  title: `Bài viết mẫu số ${i + 1}`,
  summary: 'Đây là đoạn tóm tắt ngắn gọn của bài viết...',
  cover: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  date: '2026-04-21',
  author: 'Admin',
  tags: i % 2 === 0 ? ['React', 'JavaScript'] : ['Ant Design', 'UI/UX'],
}));

const TrangChu = () => {
  const [keyword, setKeyword] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);

  // Debounce search 300ms
  const debouncedSearch = useCallback(
    debounce((value) => {
      setKeyword(value.toLowerCase());
    }, 300),
    []
  );

  // Xử lý lọc dữ liệu
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchKeyword = post.title.toLowerCase().includes(keyword);
      const matchTag = selectedTag ? post.tags.includes(selectedTag) : true;
      return matchKeyword && matchTag;
    });
  }, [keyword, selectedTag]);

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Danh sách bài viết</Title>
          {selectedTag && (
            <p>Đang lọc theo thẻ: <b>{selectedTag}</b> <a onClick={() => setSelectedTag(null)}>(Bỏ lọc)</a></p>
          )}
        </Col>
        <Col>
          <Search
            placeholder="Tìm kiếm tiêu đề..."
            onChange={(e) => debouncedSearch(e.target.value)}
            style={{ width: 300 }}
          />
        </Col>
      </Row>

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={filteredPosts}
        pagination={{
          pageSize: 9, // Phân trang 9 bài
          align: 'center'
        }}
        renderItem={item => (
          <List.Item>
            <TheBaiViet item={item} onTagClick={(tag) => setSelectedTag(tag)} />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TrangChu;