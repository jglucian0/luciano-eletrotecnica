import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "./WhatsAppButton";

const WHATSAPP_HREF = "https://wa.me/5511999999999";

describe("WhatsAppButton", () => {
  it("renderiza uma tag <a> com href para o WhatsApp", () => {
    render(<WhatsAppButton />);

    const link = screen.getByRole("link", { name: /whatsapp/i });

    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", WHATSAPP_HREF);
  });
});
