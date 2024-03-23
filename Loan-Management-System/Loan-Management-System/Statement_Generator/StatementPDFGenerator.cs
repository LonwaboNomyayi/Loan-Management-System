using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.pdf.draw;

namespace Loan_Management_System.Statement_Generator
{
    public static class StatementPDFGenerator
    {
        public static string GenerateStetementInPDF()
        {
            try
            {
                var filePath = "";
                var rootFilePath = ConfigurationManager.AppSettings.Get("Loan_Statements");
                BaseFont bf = BaseFont.CreateFont(BaseFont.TIMES_ROMAN, BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
                iTextSharp.text.Font statementHeading = new iTextSharp.text.Font(bf, 18, iTextSharp.text.Font.BOLD);
                iTextSharp.text.Font subheadingFont = new iTextSharp.text.Font(bf, 10, iTextSharp.text.Font.NORMAL);
                FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None);

                if (!Directory.Exists(rootFilePath + @"\" + DateTime.Now))
                {
                    Directory.CreateDirectory(rootFilePath + @"\" + DateTime.Now.ToString("dd.MM.yyyy"));
                }
                filePath = rootFilePath + @"\" + DateTime.Now.ToString("dd.MM.yyyy") + @"\" + "CustomerId" + "_" + "LoanId" + ".pdf";


                Rectangle rec = new Rectangle(PageSize.A4);

                Document doc = new Document(rec);

                PdfWriter writer = PdfWriter.GetInstance(doc, fs);
                doc.Open();

                ColumnText.ShowTextAligned(writer.DirectContent, Element.ALIGN_LEFT, new Phrase(new Paragraph("Loan Statement", statementHeading)), 640, 550, 0);
                ColumnText.ShowTextAligned(writer.DirectContent, Element.ALIGN_LEFT, new Phrase(new Paragraph("Loan Date:", subheadingFont)), 640, 530, 0);
                ColumnText.ShowTextAligned(writer.DirectContent, Element.ALIGN_LEFT, new Phrase(new Paragraph("Date:", subheadingFont)), 640, 520, 0);
                ColumnText.ShowTextAligned(writer.DirectContent, Element.ALIGN_LEFT, new Phrase(new Paragraph("Time:", subheadingFont)), 640, 510, 0);
                ColumnText.ShowTextAligned(writer.DirectContent, Element.ALIGN_LEFT, new Phrase(new Paragraph("Page:", subheadingFont)), 640, 500, 0);


                return "";

            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}