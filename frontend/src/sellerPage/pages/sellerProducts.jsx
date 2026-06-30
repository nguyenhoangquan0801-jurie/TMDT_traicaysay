import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Filter,
    Check,
    ChevronDown,
    Package,
    AlertTriangle,
    ExternalLink
} from 'lucide-react';
import AddProductForm from './AddProductForm';

const SellerProducts = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const handleAddProduct = (newProduct) => {
        if (editingProduct) {
            const numericId = editingProduct.id.toString().replace('PROD-', '');
            fetch(`http://localhost:8080/api/seller/products/${numericId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to update product');
                return res.json();
            })
            .then(updatedProduct => {
                setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
                setIsFormOpen(false);
                setEditingProduct(null);
            })
            .catch(err => {
                console.error('Error updating product:', err);
                alert('Không thể cập nhật sản phẩm. Vui lòng thử lại.');
            });
        } else {
            fetch('http://localhost:8080/api/seller/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to add product');
                return res.json();
            })
            .then(savedProduct => {
                setProducts(prev => [savedProduct, ...prev]);
                setIsFormOpen(false);
            })
            .catch(err => {
                console.error('Error adding product:', err);
                alert('Không thể thêm sản phẩm. Vui lòng thử lại.');
            });
        }
    };

    const openEditForm = (product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/seller/products')
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setIsError(true);
                setIsLoading(false);
            });
    }, []);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filterTab, setFilterTab] = useState('all');
    const [selectedIds, setSelectedIds] = useState([]);


    const categories = ['all', 'Trái cây sấy dẻo', 'Hạt dinh dưỡng', 'Trà & Thảo mộc', 'Trái cây sấy giòn'];

    const handleToggleStatus = (id) => {
        setProducts(products.map(p =>
            p.id === id ? { ...p, status: p.status === 'active' ? 'unlisted' : 'active' } : p
        ));
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
            const numericId = id.toString().replace('PROD-', '');
            
            fetch(`http://localhost:8080/api/seller/products/${numericId}`, {
                method: 'DELETE'
            })
            .then(res => {
                if (!res.ok) throw new Error('Failed to delete product');
                setProducts(products.filter(p => p.id !== id));
                setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                alert('Không thể xóa sản phẩm. Vui lòng thử lại.');
            });
        }
    };

    const handleSelectRow = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleSelectAll = (visibleProducts) => {
        const visibleIds = visibleProducts.map(p => p.id);
        const allVisibleSelected = visibleIds.every(id => selectedIds.includes(id));

        if (allVisibleSelected) {

            setSelectedIds(selectedIds.filter(id => !visibleIds.includes(id)));
        } else {

            setSelectedIds([...new Set([...selectedIds, ...visibleIds])]);
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Bạn có muốn xóa hàng loạt ${selectedIds.length} sản phẩm đã chọn?`)) {
            setProducts(products.filter(p => !selectedIds.includes(p.id)));
            setSelectedIds([]);
        }
    };

    const handleBulkUnlist = () => {
        setProducts(products.map(p =>
            selectedIds.includes(p.id) ? { ...p, status: 'unlisted' } : p
        ));
        setSelectedIds([]);
    };

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.sku.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

        let matchesTab = true;
        if (filterTab === 'active') matchesTab = p.status === 'active';
        if (filterTab === 'unlisted') matchesTab = p.status === 'unlisted';
        if (filterTab === 'lowStock') matchesTab = p.stock <= 5;

        return matchesSearch && matchesCategory && matchesTab;
    });

    return (
        <div className="p-8 flex flex-col gap-6 bg-slate-50 min-h-full font-sans text-slate-800">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Quản Lý Sản Phẩm</h1>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                        Xem và cập nhật danh sách hàng hóa của shop NongLam Food tại đây.
                    </p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm transition-all"
                >
                    <Plus className="w-4 h-4" />
                    Thêm sản phẩm mới
                </button>
            </div>

            {/* Add Product Modal */}
            <AddProductForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                onAddProduct={handleAddProduct}
                editingProduct={editingProduct}
            />

            {/* Error Banner */}
            {isError && (
                <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 text-rose-700 px-5 py-4 rounded-2xl shadow-sm">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-bold">Không thể kết nối đến máy chủ</p>
                        <p className="text-xs font-medium mt-0.5 text-rose-500">
                            Vui lòng kiểm tra backend đang chạy tại <code className="font-mono bg-rose-100 px-1 rounded">http://localhost:8080</code> rồi tải lại trang.
                        </p>
                    </div>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

                <div className="flex border-b border-slate-100 bg-white px-5 overflow-x-auto">
                    {[
                        { id: 'all', label: 'Tất cả', count: products.length },
                        { id: 'active', label: 'Đang hoạt động', count: products.filter(p => p.status === 'active').length },
                        { id: 'unlisted', label: 'Đã ẩn', count: products.filter(p => p.status === 'unlisted').length },
                        { id: 'lowStock', label: 'Cần nhập hàng', count: products.filter(p => p.stock <= 5).length },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => { setFilterTab(tab.id); setSelectedIds([]); }}
                            className={`py-4 px-4 text-xs font-bold border-b-2 transition-all relative flex items-center gap-2 whitespace-nowrap
                ${filterTab === tab.id
                                    ? 'border-emerald-600 text-emerald-600 font-semibold'
                                    : 'border-transparent text-slate-500 hover:text-slate-900'}`}
                        >
                            {tab.label}
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full 
                ${filterTab === tab.id
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-slate-100 text-slate-500'}`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="p-5 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white border-b border-slate-100">

                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Tìm theo tên sản phẩm hoặc SKU..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 transition-all placeholder:text-slate-400 text-slate-700"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                            <Filter className="w-3.5 h-3.5 text-slate-400" />
                            <span>Danh mục:</span>
                            <div className="relative inline-block">
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="appearance-none pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 font-semibold hover:border-slate-300 focus:outline-none text-xs cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'all' ? 'Tất cả danh mục' : cat}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {selectedIds.length > 0 && (
                    <div className="bg-emerald-50/70 border-b border-emerald-100 px-5 py-3.5 flex justify-between items-center transition-all animate-fade-in">
                        <span className="text-xs font-bold text-slate-700">
                            Đã chọn <span className="text-emerald-700 text-sm font-black">{selectedIds.length}</span> sản phẩm
                        </span>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleBulkUnlist}
                                className="text-xs font-bold text-slate-600 hover:text-slate-800 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50 transition-all flex items-center gap-1.5"
                            >
                                <EyeOff className="w-3.5 h-3.5" />
                                Ẩn sản phẩm
                            </button>
                            <button
                                onClick={handleBulkDelete}
                                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-white border border-rose-200 px-3 py-1.5 rounded-lg shadow-sm hover:bg-rose-50/50 transition-all flex items-center gap-1.5"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Xóa đã chọn
                            </button>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-slate-700">
                        <thead>
                            <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">

                                <th className="py-4 px-5 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        checked={filteredProducts.length > 0 && filteredProducts.every(p => selectedIds.includes(p.id))}
                                        onChange={() => handleSelectAll(filteredProducts)}
                                        className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                    />
                                </th>
                                <th className="py-4 px-4 font-bold">Thông tin sản phẩm</th>
                                <th className="py-4 px-4 font-bold">Danh mục</th>
                                <th className="py-4 px-4 font-bold text-right">Đơn giá</th>
                                <th className="py-4 px-4 font-bold text-center">Kho hàng</th>
                                <th className="py-4 px-4 font-bold text-center">Đã bán</th>
                                <th className="py-4 px-4 font-bold text-center">Trạng thái</th>
                                <th className="py-4 px-5 font-bold text-center w-36">Thao tác</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="8" className="py-12 text-center text-slate-400 font-medium">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                                            <span>Đang tải danh sách sản phẩm...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="py-12 text-center text-slate-400 font-medium">
                                        <div className="flex flex-col items-center gap-2">
                                            <Package className="w-8 h-8 text-slate-300" />
                                            <span>Không tìm thấy sản phẩm nào phù hợp</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((p) => (
                                    <tr
                                        key={p.id}
                                        className={`hover:bg-slate-50/50 transition-colors ${selectedIds.includes(p.id) ? 'bg-emerald-50/10' : ''}`}
                                    >

                                        <td className="py-4 px-5 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(p.id)}
                                                onChange={() => handleSelectRow(p.id)}
                                                className="w-4 h-4 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500 cursor-pointer"
                                            />
                                        </td>

                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs shadow-sm ${p.imageColor}`}>
                                                    {p.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-sm text-slate-800 hover:text-emerald-600 cursor-pointer flex items-center gap-1.5 group">
                                                        {p.name}
                                                        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                                    </span>
                                                    <span className="text-[10px] font-bold text-slate-400">SKU: {p.sku} | ID: {p.id}</span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-4 px-4">
                                            <span className="text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                                                {p.category}
                                            </span>
                                        </td>

                                        <td className="py-4 px-4 text-right font-bold text-slate-800 text-sm">
                                            {p.price.toLocaleString('vi-VN')}đ
                                        </td>

                                        <td className="py-4 px-4 text-center">
                                            {p.stock === 0 ? (
                                                <span className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                                                    <AlertTriangle className="w-3 h-3" /> Hết hàng
                                                </span>
                                            ) : p.stock <= 5 ? (
                                                <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                                                    Chỉ còn {p.stock}
                                                </span>
                                            ) : (
                                                <span className="text-sm font-semibold text-slate-700">{p.stock}</span>
                                            )}
                                        </td>

                                        <td className="py-4 px-4 text-center text-sm font-semibold text-slate-600">
                                            {p.sales}
                                        </td>

                                        <td className="py-4 px-4 text-center">
                                            {p.status === 'active' ? (
                                                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                                                    Đang hiển thị
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 px-2.5 py-0.5 rounded-full">
                                                    Đang ẩn
                                                </span>
                                            )}
                                        </td>

                                        <td className="py-4 px-5 text-center">
                                            <div className="flex items-center justify-center gap-1">

                                                <button
                                                    onClick={() => openEditForm(p)}
                                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title="Sửa thông tin"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleToggleStatus(p.id)}
                                                    className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                                    title={p.status === 'active' ? 'Ẩn sản phẩm' : 'Hiển thị sản phẩm'}
                                                >
                                                    {p.status === 'active' ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteProduct(p.id)}
                                                    className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                                    title="Xóa"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 bg-slate-50 text-xs font-semibold text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-slate-100 select-none">
                    <span>Hiển thị {filteredProducts.length} trên tổng số {products.length} sản phẩm</span>
                    <div className="flex gap-1.5">
                        <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer disabled:opacity-50" disabled>Trước</button>
                        <button className="px-2.5 py-1 rounded border border-slate-200 bg-emerald-50 text-emerald-700 font-bold">1</button>
                        <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 cursor-pointer disabled:opacity-50" disabled>Sau</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SellerProducts;
