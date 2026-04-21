import React, { useEffect } from 'react';
import { Form, Input, Modal } from 'antd';
import { taoSlug } from '../tien_ich/blog';

const FormThe = ({ open, onCancel, onSubmit, theDangSua }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (theDangSua) {
      form.setFieldsValue(theDangSua);
    } else {
      form.resetFields();
    }
  }, [theDangSua, form, open]);

  const xuLyDoiTenThe = (e) => {
    const tenThe = e.target.value;
    const slugHienTai = form.getFieldValue('slug');

    if (!theDangSua || !slugHienTai) {
      form.setFieldsValue({
        slug: taoSlug(tenThe),
      });
    }
  };

  return (
    <Modal
      open={open}
      title={theDangSua ? 'Sửa thẻ' : 'Thêm thẻ'}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          label="Tên thẻ"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên thẻ' }]}
        >
          <Input onChange={xuLyDoiTenThe} />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: 'Vui lòng nhập slug' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormThe;