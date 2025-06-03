"use client";

import { useState, useEffect } from "react";
import Magnetometer from "@/components/ui/magnetometer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ��������ʾ
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            һ���ִ����Ĵ�����UI�����֧��ʵʱ�ų�������ʾ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              ��׼������
            </h2>
            <div className="flex justify-center">
              <Magnetometer size={300} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              �򻯴�����
            </h2>
            <div className="flex justify-center">
              <Magnetometer 
                size={250} 
                showDirection={false}
                showValue={true}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              С�ʹ�����
            </h2>
            <div className="flex justify-center">
              <Magnetometer 
                size={200} 
                showDirection={true}
                showValue={false}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
              ���������
            </h2>
            <div className="flex justify-center">
              <Magnetometer 
                size={150} 
                showDirection={false}
                showValue={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            ʹ��˵��
          </h3>
          <div className="text-gray-600 dark:text-gray-300 space-y-2">
            <p>? ��ɫָ��ָ��ű�����</p>
            <p>? ��ɫָ��ָ����Ϸ���</p>
            <p>? X��Y��Z����ʾ��ά�ų�ǿ��ֵ</p>
            <p>? ֧���ƶ��豸�������Ǵ�����</p>
            <p>? �ڲ�֧�ֵ��豸�ϻ���ʾģ������</p>
          </div>
        </div>
      </div>
    </main>
  );
} 