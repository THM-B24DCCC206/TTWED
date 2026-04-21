import React, { useEffect } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { taoSlug } from '../tien_ich/blog';

const { TextArea } = Input;

const FormBaiViet = ({
  open,
  onCancel,
  onSubmit,
  baiVietDangSua,
  danhSachThe = [],
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (baiVietDangSua) {
      form.setFieldsValue(baiVietDangSua);
    } else {
      form.resetFields();
      form.setFieldsValue({
        status: 'draft',
        tags: [],
      });
    }
  }, [baiVietDangSua, form, open]);

  const xuLyDoiTieuDe = (e) => {
    const tieuDe = e.target.value;
    const slugHienTai = form.getFieldValue('slug');

    if (!baiVietDangSua || !slugHienTai) {
      form.setFieldsValue({
        slug: taoSlug(tieuDe),
      });
    }
  };

  return (
    <Modal
      open={open}
      title={baiVietDangSua ? 'Sửa bài viết' : 'Thêm bài viết'}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
      width={900}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input onChange={xuLyDoiTieuDe} />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Tóm tắt"
          name="summary"
          rules={[{ required: true, message: 'Vui lòng nhập tóm tắt' }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="content"
          rules={[{ required: true, message: 'Vui lòng nhập nội dung' }]}
        >
          <TextArea rows={12} />
        </Form.Item>

        <Form.Item
          label="Ảnh đại diện (URL)"
          name="thumbnail"
          rules={[{ required: true, message: 'Vui lòng nhập URL ảnh' }]}
        >
          <Input placeholder="https://..." />
        </Form.Item>

        <Form.Item label="Thẻ" name="tags">
          <Select mode="multiple" placeholder="Chọn thẻ">
            {danhSachThe.map((the) => (
              <Select.Option key={the.name} value={the.name}>
                {the.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Trạng thái" name="status">
          <Select>
            <Select.Option value="draft">Nháp</Select.Option>
            <Select.Option value="published">Đã đăng</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormBaiViet;