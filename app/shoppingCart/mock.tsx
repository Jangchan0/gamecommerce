export default function Component() {
    return (
        <div className="mx-auto max-w-sm space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">회원가입</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    비밀번호, 비밀번호 확인, 비밀번호 변경, 비밀번호 변경 확인을 입력하세요.
                </p>
            </div>
            <form onSubmit={onClickPayment}>
                <div className="space-y-2">
                    <label>구매자 이름</label>
                    <input id="password" required type="password" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirm-password">구매자 이메일</label>
                    <input id="confirm-password" required type="password" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="new-password">제품을 받을 주소</label>
                    <input id="address" required type="password" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="confirm-new-password">구매자 전화번호</label>
                    <input id="confirm-new-password" required type="password" />
                </div>
                <button type="submit" className="w-full">
                    확인
                </button>
            </form>
        </div>
    );
}
