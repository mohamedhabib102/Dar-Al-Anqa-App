"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { TiInputChecked } from "react-icons/ti";

interface Question {
  id: number;
  title: string;
}

export const questions: Question[] = [
  { id: 1, title: "الروايات" },
  { id: 2, title: "التنمية الذاتية" },
  { id: 3, title: "الخيال العلمي" },
  { id: 4, title: "التاريخ" },
  { id: 5, title: "كتب البرمجة" }
];


/**
 * 
 
habib
Habib7000880
  
 */
const OverlayQuestions: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [questionEdit, setQuestionEdit] = useState<Question[]>([]);
  const locale = useLocale();

  useEffect(() => {
    const isDone = Cookies.get("isDone");
    const hasCompleted = Cookies.get("hasCompletedInterests");

    if (isDone && !hasCompleted) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  const handleQuestion = (id: number, title: string) => {
    const question = { id, title };
    const filterQuesion = questionEdit.some((t) => t.id === question.id);

    if (filterQuesion) {
      const notFoundQestion = questionEdit.filter((t) => t.id !== question.id);
      setQuestionEdit(notFoundQestion);
      return;
    }
    setQuestionEdit((prev) => [...prev, question]);
  };


  const handelIsDone = () => {
    Cookies.remove("isDone");
    Cookies.set("hasCompletedInterests", "true", { expires: 365 });
    console.log(questionEdit);
    location.href = "/"
  }



  const titleText =
    locale === "ar" ? "اختر اهتماماتك"
      : locale === "fr" ? "Choisissez Vos Intérêts"
        : "Choose Your Interests";


  const descriptionText =
    locale === "ar"
      ? "ساعدنا في معرفة اهتماماتك لنقدم لك مقترحات كتب تناسب ذوقك."
      : locale === "fr"
        ? "Aidez-nous à comprendre vos intérêts afin de vous recommander des livres adaptés à vos goûts."
        : "Help us understand your interests so we can recommend books that suit your taste.";

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[700px] md:w-[450px] w-[90%]">


            <h2 className="text-xl font-medium mb-2 text-center">{titleText}</h2>

            <p className="text-gray-600 mb-6 text-center">
              {descriptionText}
            </p>

            <div className="mt-4">
              {questions.map((question) => (
                <div
                  className={`cursor-pointer mb-4 flex items-center gap-2 bg-gray-200 p-2 rounded-lg text-lg 
                                ${locale === "ar" ? "text-right justify-start" : "text-left justify-start flex-row-reverse"}`}
                  onClick={() => handleQuestion(question.id, question.title)}
                  key={question.id}
                >
                  {questionEdit.map((ele) =>
                    ele.id === question.id && (
                      <TiInputChecked
                        key={ele.id}
                        size={20}
                        className="text-green-400"
                      />
                    )
                  )}
                  <p>{question.title}</p>
                </div>
              ))}
            </div>

            <button
              onClick={handelIsDone}
              className="cursor-pointer mt-6 w-full bg-blue-600 custom_hover text-white py-2 rounded-lg text-lg"
            >
              {locale === "ar" ? "التالي" : locale === "fr" ? "Suivant" : "Next"}
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default OverlayQuestions;
