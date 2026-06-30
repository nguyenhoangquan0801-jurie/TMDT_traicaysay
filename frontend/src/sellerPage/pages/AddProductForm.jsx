import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Minus, Info, ImageIcon } from 'lucide-react';

const AddProductForm = ({ isOpen, onClose, onAddProduct, editingProduct }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        description: '',
        sku: '',
        status: 'active',
        imageUrl: ''
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                ...editingProduct,
                price: editingProduct.price.toString(),
                stock: editingProduct.stock.toString(),
                description: editingProduct.description || ''
            });
        } else {
            setFormData({
                name: '',
                category: '',
                price: '',
                stock: '',
                description: '',
                sku: '',
                status: 'active',
                imageUrl: ''
            });
        }
    }, [editingProduct, isOpen]);

    const categories = ['Trái cây sấy dẻo', 'Hạt dinh dưỡng', 'Trà & Thảo mộc', 'Trái cây sấy giòn'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.price) {
            alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
            return;
        }

        const newProduct = {
            ...formData,
            id: Date.now(), // Mock ID
            price: Number(formData.price),
            stock: Number(formData.stock),
            sales: 0,
            imageColor: 'bg-emerald-100 text-emerald-600' 
        };

        onAddProduct(newProduct);
        onClose();
        setFormData({
            name: '',
            category: '',
            price: '',
            stock: '',
            description: '',
            sku: '',
            status: 'active'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {editingProduct ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                        </h2>
                        <p className="text-xs text-slate-500 font-medium mt-1">
                            {editingProduct ? 'Cập nhật thông tin sản phẩm của bạn.' : 'Điền thông tin chi tiết để đăng bán sản phẩm của bạn.'}
                        </p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-8 max-h-[75vh] overflow-y-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Side: Image Upload & URL */}
                        <div className="w-full md:w-1/3 space-y-4">
                            <label className="text-sm font-bold text-slate-700 block">Hình ảnh sản phẩm</label>
                            
                            {/* Preview Area */}
                            <div className="aspect-square w-full border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 hover:border-emerald-300 transition-all cursor-pointer group relative overflow-hidden">
                                {formData.imageUrl ? (
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <>
                                        <div className="p-4 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-emerald-500" />
                                        </div>
                                        <div className="text-center mt-4 px-4">
                                            <p className="text-xs font-bold text-slate-700">Tải ảnh hoặc dán link</p>
                                            <p className="text-[10px] text-slate-400 mt-1">Hỗ trợ JPG, PNG, URL trực tiếp</p>
                                        </div>
                                    </>
                                )}
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer" 
                                    title="Chọn ảnh từ máy tính"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFormData(prev => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
                                        }
                                    }}
                                />
                            </div>

                            {/* URL Input Area */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Hoặc nhập link ảnh trực tiếp</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    />
                                    {formData.imageUrl && (
                                        <button 
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                                <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                                <p className="text-[10px] text-blue-600 leading-relaxed font-medium">
                                    Bạn có thể chọn ảnh từ máy tính hoặc dán đường dẫn ảnh từ internet.
                                </p>
                            </div>
                        </div>

                        {/* Right Side: Form Fields */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                                    Tên sản phẩm <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="VD: Xoài sấy dẻo thượng hạng"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                                    Danh mục <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm appearance-none bg-white"
                                    required
                                >
                                    <option value="">Chọn danh mục</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* SKU */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Mã SKU</label>
                                <input
                                    type="text"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleChange}
                                    placeholder="VD: NLF-XSD-01"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                                    Giá bán (đ) <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                    required
                                />
                            </div>

                            {/* Stock */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Số lượng tồn kho</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-slate-700">Mô tả sản phẩm</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Nhập mô tả chi tiết về sản phẩm..."
                                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-white hover:border-slate-300 transition-all"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-sm shadow-emerald-200 transition-all flex items-center gap-2"
                    >
                        {editingProduct ? 'Lưu thay đổi' : 'Đăng bán sản phẩm'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;