/** 获取全局的变量 */
export const useGlobal = <T>(globalName: string) => {
    return (globalThis as any)[globalName] as T;
};
