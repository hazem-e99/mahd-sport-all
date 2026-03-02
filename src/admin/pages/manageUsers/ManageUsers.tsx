import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import PageHeaderActions from '@admin/components/common/pageHeaderActions/pageheader-actions.component';
import ConfirmDialog from '@admin/components/common/ConfirmDialog/ConfirmDialog';
import SharedTable from '@admin/components/common/shard-table/shared-table';
import { TablePagination } from '@admin/components/common/pagination/Pagination';
import { UserManagementService } from '@admin/api/services/UserManagementService';
import { useLanguage } from '@admin/context/languageContext';
import type { ManagedUser } from '@shared/mockData/mockDb';
import AddUserModal from './components/AddUserModal';
import TempPasswordModal from './components/TempPasswordModal';
import './manage-users.scss';

const ITEMS_PER_PAGE = 10;

const ManageUsers = () => {
    const { language, getValue } = useLanguage();
    const isRtl = language === 'ar';

    const [users, setUsers] = useState<ManagedUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [tempPassUser, setTempPassUser] = useState<ManagedUser | null>(null);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await UserManagementService.getAll(search || undefined);
            setUsers(data);
        } catch {
            toast.error(getValue('user_load_failed') || 'فشل تحميل المستخدمين');
        } finally {
            setLoading(false);
        }
    }, [search, getValue]);

    useEffect(() => { fetchUsers(); }, [fetchUsers]);

    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return users.slice(start, start + ITEMS_PER_PAGE);
    }, [users, currentPage]);

    const handleAddSuccess = (newUser: ManagedUser) => {
        setUsers(prev => [newUser, ...prev]);
        setTempPassUser(newUser);
    };

    const handleDeleteClick = (id: string | number) => {
        setSelectedId(id.toString());
        setShowConfirm(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedId) return;
        setDeleteLoading(true);
        try {
            await UserManagementService.deleteUser(selectedId);
            toast.success(getValue('user_deleted_successfully') || 'تم حذف المستخدم');
            setUsers(prev => prev.filter(u => u.id !== selectedId));
        } catch {
            toast.error(getValue('user_delete_failed') || 'فشل الحذف');
        } finally {
            setDeleteLoading(false);
            setShowConfirm(false);
            setSelectedId(null);
        }
    };

    const handleToggleStatus = async (user: ManagedUser) => {
        try {
            const updated = await UserManagementService.toggleStatus(user.id);
            setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
            toast.success(
                updated.status === 'active'
                    ? (getValue('user_activated') || 'تم تفعيل المستخدم')
                    : (getValue('user_deactivated') || 'تم تعطيل المستخدم')
            );
        } catch {
            toast.error(getValue('user_toggle_failed') || 'فشلت العملية');
        }
    };

    const columns = [
        { key: 'name', label: getValue('full_name') || 'الاسم' },
        { key: 'email', label: getValue('email') || 'البريد الإلكتروني' },
        { key: 'roleName', label: getValue('role') || 'الدور' },
        { key: 'permissions', label: getValue('access_permissions') || 'الصلاحيات' },
        { key: 'isFirstLogin', label: getValue('first_login_label') || 'أول دخول؟' },
        { key: 'actions', label: getValue('actions') || 'الإجراءات' },
    ];

    return (
        <div className="manage-users-page" dir={isRtl ? 'rtl' : 'ltr'}>
            <PageHeaderActions
                title={getValue('manage_users') || 'إدارة المستخدمين'}
                breadcrumb={
                    <ul className="menu-breadcrumb">
                        <li>{getValue('breadcrumb_home') || 'الرئيسية'}</li>
                        <li>-</li>
                        <li>{getValue('manage_users') || 'إدارة المستخدمين'}</li>
                    </ul>
                }
                showBtns={false}
            />

            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <div className="mu-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder={getValue('search_users') || 'بحث بالاسم أو البريد...'}
                        value={search}
                        onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
                    />
                </div>
                <button className="main-button active" onClick={() => setShowAddModal(true)}>
                    <span>+</span> {getValue('add_user') || 'إضافة مستخدم'}
                </button>
            </div>

            <div className="card border-0 rounded-3 bg-white">
                <div className="card-body p-0">
                    <SharedTable
                        data={paginatedUsers}
                        setData={() => { }}
                        columns={columns}
                        showEditIcon={false}
                        showDeleteIcon={true}
                        onDelete={handleDeleteClick}
                        pending={loading}
                        customCellRender={(col, item: ManagedUser) => {
                            if (col.key === 'permissions') {
                                return (
                                    <td key={col.key}>
                                        <div className="mu-permissions">
                                            {item.permissions.map(p => (
                                                <span key={p} className="mu-badge">{p}</span>
                                            ))}
                                        </div>
                                    </td>
                                );
                            }
                            if (col.key === 'isFirstLogin') {
                                return (
                                    <td key={col.key}>
                                        {item.isFirstLogin ? (
                                            <span className="mu-badge mu-badge--warn">
                                                {getValue('first_login_pending') || 'في انتظار'}
                                            </span>
                                        ) : (
                                            <span className="mu-badge mu-badge--ok">
                                                {getValue('first_login_done') || 'مكتمل'}
                                            </span>
                                        )}
                                    </td>
                                );
                            }
                            if (col.key === 'actions') {
                                const isActive = item.status === 'active';
                                return (
                                    <td key={col.key}>
                                        <div className="mu-actions">
                                            {/* Toggle Switch */}
                                            <label
                                                className="mu-switch"
                                                title={isActive
                                                    ? (getValue('user_deactivated') || 'تعطيل')
                                                    : (getValue('user_activated') || 'تفعيل')
                                                }
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isActive}
                                                    onChange={() => handleToggleStatus(item)}
                                                />
                                                <span className="mu-switch__track">
                                                    <span className="mu-switch__thumb" />
                                                </span>
                                            </label>

                                            {/* Delete */}
                                            <button
                                                className="mu-delete-btn"
                                                onClick={() => handleDeleteClick(item.id)}
                                                title={getValue('delete_user') || 'حذف'}
                                            >
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                                                    <path d="M10 11v6M14 11v6" />
                                                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                );
                            }
                            return undefined;
                        }}
                    />
                </div>
            </div>

            {users.length > ITEMS_PER_PAGE && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={users.length}
                    itemsPerPage={ITEMS_PER_PAGE}
                    onItemsPerPageChange={() => { }}
                />
            )}

            <AddUserModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleAddSuccess}
                language={language}
            />

            {tempPassUser && (
                <TempPasswordModal
                    user={tempPassUser}
                    onClose={() => setTempPassUser(null)}
                />
            )}

            <ConfirmDialog
                show={showConfirm}
                onHide={() => setShowConfirm(false)}
                onConfirm={handleConfirmDelete}
                title={getValue('delete_user') || 'حذف المستخدم'}
                message={getValue('delete_user_confirm') || 'هل أنت متأكد من حذف هذا المستخدم؟'}
                subMessage={getValue('delete_user_sub') || 'لن يتمكن من تسجيل الدخول بعد الحذف.'}
                confirmText={getValue('delete') || 'حذف'}
                cancelText={getValue('cancel') || 'إلغاء'}
                confirmVariant="danger"
                loading={deleteLoading}
                loadingText={getValue('deleting') || 'جاري الحذف...'}
            />
        </div>
    );
};

export default ManageUsers;
